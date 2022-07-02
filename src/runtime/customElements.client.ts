import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('app:mounted', () => {
    defineCustomElements(window)
  })
})
