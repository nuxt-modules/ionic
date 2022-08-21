import { defineNuxtPlugin } from '#imports'
import CreateAnimation from './components/CreateAnimation.vue'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('CreateAnimation', CreateAnimation)
})
