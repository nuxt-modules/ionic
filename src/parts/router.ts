import { existsSync } from 'node:fs'
import { useNuxt, useLogger } from '@nuxt/kit'
import { join, resolve } from 'pathe'
import { runtimeDir } from '../utils'

export const setupRouter = () => {
  const nuxt = useNuxt()
  const logger = useLogger()

  const pagesDirs = nuxt.options._layers.map(layer =>
    resolve(layer.config?.srcDir || layer.cwd!, layer.config?.dir?.pages || 'pages'),
  )

  // Disable module (and use universal router) if pages dir do not exists or user has disabled it
  if (
    nuxt.options.pages === false
    || (nuxt.options.pages !== true && !pagesDirs.some(dir => existsSync(dir)))
  ) {
    logger.info('Disabling Ionic Router integration as pages dir does not exist.')
    return
  }

  const ROUTER_PLUGIN_RE = /nuxt3?\/dist\/(app\/plugins|pages\/runtime)\/(plugins\/)?router/
  const ionicRouterPlugin = {
    src: resolve(runtimeDir, 'router'),
    mode: 'all',
  } as const

  nuxt.hook('modules:done', () => {
    nuxt.hook('app:resolve', (app) => {
      const routerPlugin = app.plugins.findIndex(p => ROUTER_PLUGIN_RE.test(p.src))
      if (routerPlugin !== -1) {
        app.plugins.splice(routerPlugin, 1, ionicRouterPlugin)
      }
      else {
        app.plugins.unshift(ionicRouterPlugin)
      }
    })
  })

  // Add default ionic root layout
  nuxt.hook('app:resolve', (app) => {
    if (
      !app.mainComponent
      || app.mainComponent.includes('@nuxt/ui-templates')
      || app.mainComponent.match(/nuxt3?\/dist/)
    ) {
      app.mainComponent = join(runtimeDir, 'app.vue')
    }
  })
}
