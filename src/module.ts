import { fileURLToPath } from 'url'
import { join, resolve } from 'pathe'
import { defineUnimportPreset } from 'unimport'
import {
  defineNuxtModule,
  addComponent,
  addPlugin,
  installModule,
} from '@nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'

export interface ModuleOptions {
  integrations?: {
    router?: boolean
    pwa?: boolean
    meta?: boolean
  }
  css?: {
    core?: boolean
    basic?: boolean
    utilities?: boolean
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ionic',
    configKey: 'ionic',
  },
  defaults: {
    integrations: {
      meta: true,
      pwa: true,
      router: true,
    },
    css: {
      core: true,
      basic: true,
      utilities: false,
    },
  },
  async setup(options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.build.transpile.push(/@ionic/)

    // Set up Ionic Core
    addPlugin(resolve(runtimeDir, 'ionic'))

    // Add Ionic Core CSS
    if (options.css?.core) {
      // Core CSS required for Ionic components to work properly
      nuxt.options.css.push('@ionic/vue/css/core.css')
    }

    if (options.css?.basic) {
      // Basic CSS for apps built with Ionic
      nuxt.options.css.push(
        '@ionic/vue/css/normalize.css',
        '@ionic/vue/css/structure.css',
        '@ionic/vue/css/typography.css'
      )
    }

    if (options.css?.utilities) {
      // Optional CSS utils that can be commented out
      nuxt.options.css.push(
        '@ionic/vue/css/padding.css',
        '@ionic/vue/css/float-elements.css',
        '@ionic/vue/css/text-alignment.css',
        '@ionic/vue/css/text-transformation.css',
        '@ionic/vue/css/flex-utils.css',
        '@ionic/vue/css/display.css'
      )
    }

    // Add auto-imported components
    IonicBuiltInComponents.map(name =>
      addComponent({
        name,
        export: name,
        filePath: '@ionic/vue',
      })
    )

    // Add auto-imported composables
    nuxt.hook('autoImports:sources', presets => {
      presets.push(
        defineUnimportPreset({
          from: '@ionic/vue',
          imports: [...IonicHooks],
        })
      )
    })

    if (options.integrations.meta) {
      for (const meta of metaDefaults) {
        if (!nuxt.options.app.head.meta.some(i => i.name === meta.name)) {
          nuxt.options.app.head.meta.unshift(meta)
        }
      }
      nuxt.options.app.head.viewport =
        'viewport-fit: cover, width: device-width, initial-scale: 1.0, minimum-scale: 1.0, maximum-scale: 1.0, user-scalable: no'
    }

    if (options.integrations.pwa) {
      await installModule('@kevinmarrec/nuxt-pwa')
    }

    // Set up Ionic Router integration
    if (options.integrations?.router) {
      addPlugin(resolve(runtimeDir, 'router'))
      nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
      nuxt.options.vite.optimizeDeps.include =
        nuxt.options.vite.optimizeDeps.include || []
      nuxt.options.vite.optimizeDeps.include.push('@ionic/vue-router')

      nuxt.hook('modules:done', () => {
        nuxt.options.plugins = nuxt.options.plugins.filter(
          p =>
            !(typeof p === 'string' ? p : p.src).endsWith(
              'nuxt/dist/pages/runtime/router'
            ) &&
            !(typeof p === 'string' ? p : p.src).endsWith(
              'nuxt/dist/app/plugins/router'
            )
        )

        // Add all pages to be prerendered
        const routes: string[] = []

        nuxt.hook('pages:extend', pages => {
          routes.length = 0
          function processPages(pages: NuxtPage[]) {
            for (const page of pages) {
              if (!page.path.includes(':')) {
                routes.push(page.path)
              }
              if (page.children) {
                processPages(page.children)
              }
            }
          }
          processPages(pages)
        })

        nuxt.hook('nitro:build:before', nitro => {
          nitro.options.prerender.routes = routes
        })
      })

      // Remove vue-router types
      nuxt.hook('prepare:types', ({ references }) => {
        const index = references.findIndex(
          i => 'types' in i && i.types === 'vue-router'
        )
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
  },
})

const IonicHooks = [
  'useBackButton',
  'useKeyboard',
  'createAnimation',
  'createGesture',
  'iosTransitionAnimation',
  'mdTransitionAnimation',
  'getPlatforms',
  'isPlatform',
  'menuController',
  'getTimeGivenProgression',
  'onIonViewWillEnter',
  'onIonViewDidEnter',
  'onIonViewWillLeave',
  'onIonViewDidLeave',
  'useIonRouter',
]

const IonicBuiltInComponents = [
  'IonAccordion',
  'IonAccordionGroup',
  'IonAvatar',
  'IonBackdrop',
  'IonBadge',
  'IonBreadcrumb',
  'IonBreadcrumbs',
  'IonButton',
  'IonButtons',
  'IonCard',
  'IonCardContent',
  'IonCardHeader',
  'IonCardSubtitle',
  'IonCardTitle',
  'IonCheckbox',
  'IonChip',
  'IonCol',
  'IonContent',
  'IonDatetime',
  'IonFab',
  'IonFabButton',
  'IonFabList',
  'IonFooter',
  'IonGrid',
  'IonHeader',
  'IonImg',
  'IonInfiniteScroll',
  'IonInfiniteScrollContent',
  'IonInput',
  'IonItem',
  'IonItemDivider',
  'IonItemGroup',
  'IonItemOption',
  'IonItemOptions',
  'IonItemSliding',
  'IonLabel',
  'IonList',
  'IonListHeader',
  'IonMenu',
  'IonMenuButton',
  'IonMenuToggle',
  'IonNav',
  'IonNavLink',
  'IonNote',
  'IonProgressBar',
  'IonRadio',
  'IonRadioGroup',
  'IonRange',
  'IonRefresher',
  'IonRefresherContent',
  'IonReorder',
  'IonReorderGroup',
  'IonRippleEffect',
  'IonRow',
  'IonSearchbar',
  'IonSegment',
  'IonSegmentButton',
  'IonSelect',
  'IonSelectOption',
  'IonSkeletonText',
  'IonSlide',
  'IonSlides',
  'IonSpinner',
  'IonSplitPane',
  'IonText',
  'IonTextarea',
  'IonThumbnail',
  'IonTitle',
  'IonToggle',
  'IonToolbar',
  'IonVirtualScroll',
  'IonBackButton',
  'IonPage',
  'IonRouterOutlet',
  'IonTabButton',
  'IonTabs',
  'IonTabBar',
  'IonIcon',
  'IonApp',
  'IonActionSheet',
  'IonAlert',
  'IonLoading',
  'IonPicker',
  'IonToast',
  'IonModal',
  'IonPopover',
]

const metaDefaults = [
  { name: 'color-scheme', content: 'light dark' },
  { name: 'format-detection', content: 'telephone: no' },
  { name: 'msapplication-tap-highlight', content: 'no' },
  // add to homescreen for ios
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-title', content: 'Ionic App' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
]
