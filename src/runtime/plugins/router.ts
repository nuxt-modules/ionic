import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from '@ionic/vue-router'

import { isReadonly, reactive, shallowReactive, shallowRef } from 'vue'
import type { Ref } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { createError } from 'h3'
import { isEqual, withoutBase } from 'ufo'

import type { PageMeta, Plugin, RouteMiddleware } from '#app'
import { getRouteRules } from '#app/composables/manifest'
import { defineNuxtPlugin, useRuntimeConfig } from '#app/nuxt'
import { clearError, showError, useError } from '#app/composables/error'
import { navigateTo } from '#app/composables/router'

// @ts-expect-error virtual file
import { globalMiddleware, namedMiddleware } from '#build/middleware'
import { appManifest as isAppManifestEnabled } from '#build/nuxt.config.mjs'
// @ts-expect-error virtual file
import routerOptions from '#build/router.options'
// @ts-expect-error virtual file
import _routes from '#build/routes'

const plugin: Plugin<{ router: Router }> = defineNuxtPlugin({
  name: 'nuxt-ionic:router',
  enforce: 'pre',
  async setup(nuxtApp) {
    let routerBase = useRuntimeConfig().app.baseURL
    if (routerOptions.hashMode && !routerBase.includes('#')) {
      // allow the user to provide a `#` in the middle: `/base/#/app`
      routerBase += '#'
    }

    const history
      = routerOptions.history?.(routerBase)
        ?? (import.meta.client
          ? routerOptions.hashMode
            ? createWebHashHistory(routerBase)
            : createWebHistory(routerBase)
          : createMemoryHistory(routerBase))

    const routes = routerOptions.routes?.(_routes) ?? _routes

    const router = createRouter({
      ...routerOptions,
      history,
      routes,
    })

    if (import.meta.client && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto'
    }
    nuxtApp.vueApp.use(router)

    const previousRoute = shallowRef(router.currentRoute.value)
    router.afterEach((_to, from) => {
      previousRoute.value = from
    })

    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, 'previousRoute', {
      get: () => previousRoute.value,
    })

    const initialURL = import.meta.server
      ? nuxtApp.ssrContext!.url
      : createCurrentLocation(routerBase, window.location, nuxtApp.payload.path)

    // Allows suspending the route object until page navigation completes
    const _route = shallowRef(router.currentRoute.value)
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value
    }
    nuxtApp.hook('page:finish', syncCurrentRoute)
    router.afterEach((to, from) => {
      // We won't trigger suspense if the component is reused between routes
      // so we need to update the route manually
      // also syncing route if there is no component (like with route redirect or alias) to prevent unnecessary updates
      const toComponent = to.matched[0]?.components?.default
      const fromComponent = from.matched[0]?.components?.default

      if (!fromComponent || toComponent === fromComponent) {
        syncCurrentRoute()
      }
    })

    // https://github.com/vuejs/router/blob/main/packages/router/src/router.ts#L1225-L1233
    const route = {} as RouteLocationNormalizedLoaded
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key as keyof RouteLocationNormalizedLoaded],
      })
    }

    nuxtApp._route = shallowReactive(route)

    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {},
    }

    const error = useError()
    if (import.meta.client || !nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware

        if (import.meta.client && !nuxtApp.isHydrating && error.value) {
          // Clear any existing errors
          await nuxtApp.runWithContext(clearError)
        }
        if (failure) {
          await nuxtApp.callHook('page:loading:end')
        }
        if (import.meta.server && failure?.type === 4 /* ErrorTypes.NAVIGATION_ABORTED */) {
          return
        }
        if (to.matched.length === 0) {
          await nuxtApp.runWithContext(() => showError(createError({
            statusCode: 404,
            fatal: false,
            statusMessage: `Page not found: ${to.fullPath}`,
            data: {
              path: to.fullPath,
            },
          })))
        }
        else if (import.meta.server && to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || '/'))
        }
      })
    }

    const resolvedInitialRoute = import.meta.client && initialURL !== router.currentRoute.value.fullPath
      ? router.resolve(initialURL)
      : router.currentRoute.value
    syncCurrentRoute()

    if (import.meta.server && nuxtApp.ssrContext?.islandContext) {
      // We're in an island context, and don't need to handle middleware or redirections
      return { provide: { router } }
    }

    const initialLayout = nuxtApp.payload.state._layout

    const pluginsReady = new Promise<void>((resolve) => {
      nuxtApp.hooks.hookOnce('app:created', async () => {
        delete nuxtApp._processingMiddleware
        resolve()
      })
    })

    let needsCorrection = import.meta.client

    router.beforeEach(async (to, from) => {
      // wait for plugins to finish
      await pluginsReady
      await nuxtApp.callHook('page:loading:start')

      to.meta = reactive(to.meta)
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout as Exclude<PageMeta['layout'], Ref | false>
      }
      nuxtApp._processingMiddleware = true

      if (needsCorrection) {
        needsCorrection = false
        // #4920, #4982
        if ('name' in resolvedInitialRoute) {
          resolvedInitialRoute.name = undefined
        }
        return { ...resolvedInitialRoute, replace: true }
      }

      if (import.meta.client || !nuxtApp.ssrContext?.islandContext) {
        type MiddlewareDef = string | RouteMiddleware
        const middlewareEntries = new Set<MiddlewareDef>([...globalMiddleware, ...nuxtApp._middleware.global])
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware as MiddlewareDef | MiddlewareDef[]
          if (!componentMiddleware) {
            continue
          }
          for (const entry of toArray(componentMiddleware)) {
            middlewareEntries.add(entry)
          }
        }

        if (isAppManifestEnabled) {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path))

          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key)
              }
              else {
                middlewareEntries.delete(key)
              }
            }
          }
        }

        for (const entry of middlewareEntries) {
          const middleware
            = typeof entry === 'string'
              ? nuxtApp._middleware.named[entry]
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              || await namedMiddleware[entry]?.().then((r: any) => r.default || r)
              : entry

          if (!middleware) {
            if (import.meta.dev) {
              throw new Error(`Unknown route middleware: '${entry}'. Valid middleware: ${Object.keys(namedMiddleware).map(mw => `'${mw}'`).join(', ')}.`)
            }
            throw new Error(`Unknown route middleware: '${entry}'.`)
          }

          const result = await nuxtApp.runWithContext(() => middleware(to, from))
          if (import.meta.server || (!nuxtApp.payload.serverRendered && nuxtApp.isHydrating)) {
            if (result === false || result instanceof Error) {
              const error = result || createError({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`,
              })
              await nuxtApp.runWithContext(() => showError(error))
              return false
            }
          }

          if (result === true) {
            continue
          }
          if (result || result === false) {
            return result
          }
        }
      }
    })

    router.onError(async () => {
      delete nuxtApp._processingMiddleware
      await nuxtApp.callHook('page:loading:end')
    })

    return { provide: { router } }
  },
})

// https://github.com/vuejs/router/blob/4a0cc8b9c1e642cdf47cc007fa5bbebde70afc66/packages/router/src/history/html5.ts#L37
function createCurrentLocation(base: string, location: Location, renderedPath?: string): string {
  const { pathname, search, hash } = location
  // allows hash bases like #, /#, #/, #!, #!/, /#!/, or even /folder#end
  const hashPos = base.indexOf('#')
  if (hashPos > -1) {
    const slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1
    let pathFromHash = hash.slice(slicePos)
    // prepend the starting slash to hash so the url starts with /#
    if (pathFromHash[0] !== '/') {
      pathFromHash = '/' + pathFromHash
    }
    return withoutBase(pathFromHash, '')
  }
  const displayedPath = withoutBase(pathname, base)
  const path = !renderedPath || isEqual(displayedPath, renderedPath, { trailingSlash: true }) ? displayedPath : renderedPath
  return path + (path.includes('?') ? '' : search) + hash
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

export default plugin
