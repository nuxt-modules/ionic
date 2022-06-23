import { existsSync } from 'node:fs'
import { addPlugin, useNuxt } from '@nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'
import { join, resolve } from 'pathe'
import { joinURL } from 'ufo'
import { runtimeDir } from '../utils'

export const setupRouter = () => {
  const nuxt = useNuxt()
  const pagesDirs = nuxt.options._layers.map(layer =>
    resolve(layer.config.srcDir || layer.cwd!, layer.config.dir?.pages || 'pages')
  )

  // Disable module (and use universal router) if pages dir do not exists or user has disabled it
  if (
    nuxt.options.pages === false ||
    (nuxt.options.pages !== true && !pagesDirs.some(dir => existsSync(dir)))
  ) {
    console.warn('Disabling Ionic Router integration as pages dir does not exist.')
    return
  }

  addPlugin(resolve(runtimeDir, 'router'))
  nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
  nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
  nuxt.options.vite.optimizeDeps.include.push('@ionic/vue-router')

  nuxt.hook('app:resolve', app => {
    app.plugins = app.plugins.filter(
      p => !p.src.match(/nuxt3?\/dist\/(app\/plugins|pages\/runtime)\/router/)
    )
  })

  // Add all pages to be prerendered
  const routes: string[] = []

  nuxt.hook('pages:extend', pages => {
    routes.length = 0
    routes.push('/', ...((nuxt.options.nitro.prerender?.routes || []) as string[]))
    function processPages(pages: NuxtPage[], currentPath = '') {
      for (const page of pages) {
        if (page.path.includes(':')) continue

        const path = joinURL(currentPath, page.path)
        routes.push(path)
        if (page.children) processPages(page.children, path)
      }
    }
    processPages(pages)
  })

  nuxt.hook('nitro:build:before', nitro => {
    nitro.options.prerender.routes = routes
  })

  // Remove vue-router types
  nuxt.hook('prepare:types', ({ references }) => {
    const index = references.findIndex(i => 'types' in i && i.types === 'vue-router')
    if (index !== -1) {
      references.splice(index, 1)
    }
  })

  // Add default ionic root layout
  nuxt.hook('app:resolve', app => {
    if (
      !app.mainComponent ||
      app.mainComponent.includes('@nuxt/ui-templates') ||
      app.mainComponent.match(/nuxt3?\/dist/)
    ) {
      app.mainComponent = join(runtimeDir, 'app.vue')
    }
  })
}
