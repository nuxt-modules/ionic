import { IonicVue } from '@ionic/vue'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(IonicVue)
})
