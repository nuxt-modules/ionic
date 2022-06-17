import { IonicVue } from '@ionic/vue'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(IonicVue)
})
