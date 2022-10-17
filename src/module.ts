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
    backButtonIcon?: string
    backButtonText?: string
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
    toastEnter?: AnimationBuilder
    toastLeave?: AnimationBuilder
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/ionic',
    configKey: 'ionic',
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
  async setup (options, nuxt) {
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
    nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
    nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
    nuxt.options.vite.optimizeDeps.include.push('@ionic/vue')

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

/* Ionic Hooks and components */

// If you are about to add a hook or component to one of the array below, please do so
// in alphabetical order. This makes it easier to find and check if certain hooks & components are there

const IonicHooks = [
  'createAnimation',
  'createGesture',
  'getPlatforms',
  'getTimeGivenProgression',
  'iosTransitionAnimation',
  'isPlatform',
  'mdTransitionAnimation',
  'menuController',
  'onIonViewDidEnter',
  'onIonViewDidLeave',
  'onIonViewWillEnter',
  'onIonViewWillLeave',
  'useBackButton',
  'useIonRouter',
  'useKeyboard',
]

const IonicBuiltInComponents = [
  'IonAccordion',
  'IonAccordionGroup',
  'IonActionSheet',
  'IonAlert',
  'IonApp',
  'IonAvatar',
  'IonBackButton',
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
  'IonDatetimeButton',
  'IonFab',
  'IonFabButton',
  'IonFabList',
  'IonFooter',
  'IonGrid',
  'IonHeader',
  'IonIcon',
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
  'IonLoading',
  'IonMenu',
  'IonMenuButton',
  'IonMenuToggle',
  'IonModal',
  'IonNav',
  'IonNavLink',
  'IonNote',
  'IonPage',
  'IonPicker',
  'IonPopover',
  'IonProgressBar',
  'IonRadio',
  'IonRadioGroup',
  'IonRange',
  'IonRefresher',
  'IonRefresherContent',
  'IonReorder',
  'IonReorderGroup',
  'IonRippleEffect',
  'IonRouterOutlet',
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
  'IonTabBar',
  'IonTabButton',
  'IonTabs',
  'IonText',
  'IonTextarea',
  'IonThumbnail',
  'IonTitle',
  'IonToast',
  'IonToggle',
  'IonToolbar',
  'IonVirtualScroll',
]
