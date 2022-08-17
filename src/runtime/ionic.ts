import { IonicVue } from '@ionic/vue'
import { defineNuxtPlugin } from '#imports'
// @ts-expect-error virtual template
import ionicVueConfig from '#build/ionic/vue-config.mjs'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(IonicVue, ionicVueConfig)
})
