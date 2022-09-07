import { existsSync } from 'node:fs'
import { useNuxt, useLogger } from '@nuxt/kit'
import { join, resolve } from 'pathe'
import { runtimeDir } from '../utils'

export const setupRouter = () => {
  const nuxt = useNuxt()
  const logger = useLogger()

  const pagesDirs = nuxt.options._layers.map(layer =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    resolve(layer.config?.srcDir || layer.cwd!, layer.config?.dir?.pages || 'pages')
  )

  // Disable module (and use universal router) if pages dir do not exists or user has disabled it
  if (
    nuxt.options.pages === false ||
    (nuxt.options.pages !== true && !pagesDirs.some(dir => existsSync(dir)))
  ) {
    logger.info('Disabling Ionic Router integration as pages dir does not exist.')
    return
  }

  nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
  nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
  nuxt.options.vite.optimizeDeps.include.push('@ionic/vue-router')

  nuxt.hook('modules:done', () => {
    nuxt.hook('app:resolve', app => {
      app.plugins = app.plugins.filter(
        p => !p.src.match(/nuxt3?\/dist\/(app\/plugins|pages\/runtime)\/router/)
      )
      app.plugins.unshift({
        src: resolve(runtimeDir, 'router'),
        mode: 'all',
      })
    })
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
