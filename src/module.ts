import { fileURLToPath } from 'url'
import { join, resolve } from 'pathe'
import { defineUnimportPreset } from 'unimport'
import { defineNuxtModule, addComponent, addPlugin } from '@nuxt/kit'

export interface ModuleOptions {
  integrations?: {
    router?: boolean
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
      router: true,
    },
    css: {
      core: true,
      basic: true,
      utilities: false,
    },
  },
  setup(options, nuxt) {
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
