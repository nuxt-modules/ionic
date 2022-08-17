import { IonicVue } from '@ionic/vue'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  nuxtApp.vueApp.use(IonicVue, config.public.ionic)
})
