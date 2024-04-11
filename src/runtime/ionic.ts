import { IonicVue } from '@ionic/vue'
import { defineNuxtPlugin } from '#imports'
import ionicVueConfig from '#build/ionic/vue-config.mjs'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(IonicVue, ionicVueConfig)
})
