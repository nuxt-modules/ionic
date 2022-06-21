import { existsSync, promises as fsp } from 'node:fs'

import { defineNuxtModule, addComponent, addPlugin } from '@nuxt/kit'
import { join, resolve } from 'pathe'
import { readPackageJSON } from 'pkg-types'
import { defineUnimportPreset } from 'unimport'

import { runtimeDir } from './utils'

import { useCSSSetup } from './parts/css'
import { setupMeta } from './parts/meta'
import { setupPWA } from './parts/pwa'
import { setupRouter } from './parts/router'

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
    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.build.transpile.push(/@ionic/)

    // Set up Ionic config
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
