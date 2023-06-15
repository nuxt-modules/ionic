import { existsSync, promises as fsp } from 'node:fs'

import {
  defineNuxtModule,
  addComponent,
  addPlugin,
  addTemplate,
  addImportsSources,
} from '@nuxt/kit'
import { join, resolve } from 'pathe'
import { readPackageJSON } from 'pkg-types'
import { defineUnimportPreset } from 'unimport'

import { runtimeDir } from './utils'
import { IonicBuiltInComponents, IonicHooks } from './imports'

import { setupUtilityComponents } from './parts/components'
import { useCSSSetup } from './parts/css'
import { setupIcons } from './parts/icons'
import { setupMeta } from './parts/meta'
import { setupPWA } from './parts/pwa'
import { setupRouter } from './parts/router'

import type { AnimationBuilder, SpinnerTypes, PlatformConfig } from '@ionic/vue'

export interface ModuleOptions {
  integrations?: {
    router?: boolean
    pwa?: boolean
    meta?: boolean
    icons?: boolean
  }
  css?: {
    core?: boolean
    basic?: boolean
    utilities?: boolean
  }
  config?: {
    actionSheetEnter?: AnimationBuilder
    actionSheetLeave?: AnimationBuilder
    alertEnter?: AnimationBuilder
    alertLeave?: AnimationBuilder
    animated?: boolean
    backButtonDefaultHref?: string
    backButtonIcon?: string
    backButtonText?: string
    innerHTMLTemplatesEnabled?: boolean
    hardwareBackButton?: boolean
    infiniteLoadingSpinner?: SpinnerTypes
    loadingEnter?: AnimationBuilder
    loadingLeave?: AnimationBuilder
    loadingSpinner?: SpinnerTypes
    menuIcon?: string
    menuType?: string
    modalEnter?: AnimationBuilder
    modalLeave?: AnimationBuilder
    mode?: 'ios' | 'md'
    navAnimation?: AnimationBuilder
    pickerEnter?: AnimationBuilder
    pickerLeave?: AnimationBuilder
    platform?: PlatformConfig
    popoverEnter?: AnimationBuilder
    popoverLeave?: AnimationBuilder
    refreshingIcon?: string
    refreshingSpinner?: SpinnerTypes
    sanitizerEnabled?: boolean
    spinner?: SpinnerTypes
    statusTap?: boolean
    swipeBackEnabled?: boolean
    tabButtonLayout?:
      | 'icon-top'
      | 'icon-start'
      | 'icon-end'
      | 'icon-bottom'
      | 'icon-hide'
      | 'label-hide'
    toastDuration?: number
    toastEnter?: AnimationBuilder
    toastLeave?: AnimationBuilder
    toggleOnOffLabels?: boolean
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/ionic',
    configKey: 'ionic',
    compatibility: {
      nuxt: '^3.0.0-rc.12',
    },
  },
  defaults: {
    integrations: {
      meta: true,
      pwa: true,
      router: true,
      icons: true,
    },
    css: {
      core: true,
      basic: true,
      utilities: false,
    },
    config: {},
  },
  async setup(options, nuxt) {
    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.build.transpile.push(/@ionic/, /@stencil/)

    // Inject options for the Ionic Vue plugin as a virtual module
    addTemplate({
      filename: 'ionic/vue-config.mjs',
      getContents: () => `export default ${JSON.stringify(options.config)}`,
    })

    // Set up Ionic config file
    const ionicConfigPath = join(nuxt.options.rootDir, 'ionic.config.json')
    if (!existsSync(ionicConfigPath)) {
      await fsp.writeFile(
        ionicConfigPath,
        JSON.stringify(
          {
            name: await readPackageJSON(nuxt.options.rootDir).then(
              ({ name }) => name || 'nuxt-ionic-project'
            ),
            integrations: {},
            type: 'vue',
          },
          null,
          2
        )
      )
    }

    // Set up Ionic Core
    addPlugin(resolve(runtimeDir, 'ionic'))

    // Add Nuxt Vue custom utility components
    setupUtilityComponents()

    // Add auto-imported components
    IonicBuiltInComponents.map(name =>
      addComponent({
        name,
        export: name,
        filePath: '@ionic/vue',
      })
    )

    // Add auto-imported composables
    addImportsSources(
      defineUnimportPreset({
        from: '@ionic/vue',
        imports: [...IonicHooks],
      })
    )

    if (nuxt.options._generate) {
      nuxt.hook('nitro:config', async config => {
        config.prerender ||= {}
        config.prerender.routes ||= []
        config.prerender.routes.push('/200.html')

        config.output ||= {}
        if (!config.output.publicDir) {
          const distDir = resolve(nuxt.options.rootDir, 'dist')
          const stats = await fsp.lstat(distDir).catch(() => null)
          if (!stats || !stats.isSymbolicLink()) {
            config.output.publicDir = distDir
            if (!existsSync(distDir)) {
              await fsp.mkdir(distDir, { recursive: true })
            }
          }
        }
      })

      // Ensure there is an index.html file present when doing static file generation
      let publicFolder: string
      nuxt.hook('nitro:init', nitro => {
        publicFolder = nitro.options.output.publicDir
      })

      nuxt.hook('close', async () => {
        const indexFile = join(publicFolder, 'index.html')
        const fallbackFile = join(publicFolder, '200.html')

        if (!existsSync(indexFile) && existsSync(fallbackFile)) {
          await fsp.copyFile(fallbackFile, indexFile)
        }
      })
    }

    const { setupBasic, setupCore, setupUtilities } = useCSSSetup()

    // Add Ionic Core CSS
    if (options.css?.core) {
      await setupCore()
    }

    if (options.css?.basic) {
      await setupBasic()
    }

    if (options.css?.utilities) {
      await setupUtilities()
    }

    // Add auto-imported icons
    if (options.integrations?.icons) {
      await setupIcons()
    }

    if (options.integrations?.meta) {
      await setupMeta()
    }

    if (options.integrations?.pwa) {
      await setupPWA()
    }

    // Set up Ionic Router integration
    if (options.integrations?.router) {
      await setupRouter()
    }
  },
})
