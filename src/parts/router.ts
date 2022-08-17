import { existsSync } from 'node:fs'
import { addPlugin, useNuxt } from '@nuxt/kit'
import { join, resolve } from 'pathe'
import { runtimeDir } from '../utils'

export const setupRouter = () => {
  const nuxt = useNuxt()
  const pagesDirs = nuxt.options._layers.map(layer =>
    resolve(layer.config?.srcDir || layer.cwd!, layer.config?.dir?.pages || 'pages')
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

  nuxt.hook('modules:done', () => {
    nuxt.hook('app:resolve', app => {
      app.plugins = app.plugins.filter(
        p => !p.src.match(/nuxt3?\/dist\/(app\/plugins|pages\/runtime)\/router/)
      )
    })
  })

  // Remove Nuxt useRoute & useRouter composables

  nuxt.hook('autoImports:sources', sources => {
    for (const source of sources) {
      if (source.from === '#app') {
        source.imports = source.imports.filter(
          i => typeof i !== 'string' || !['useRoute', 'useRouter'].includes(i)
        )
      }
    }
    sources.push({
      from: 'vue-router',
      imports: ['useRouter', 'useRoute'],
    })
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
