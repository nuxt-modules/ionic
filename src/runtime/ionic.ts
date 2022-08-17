import { IonicVue } from '@ionic/vue'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(nuxtApp => {
  const { ionic: config } = useRuntimeConfig()
  nuxtApp.vueApp.use(IonicVue, config)
})
