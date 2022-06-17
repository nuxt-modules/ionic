import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from '@ionic/vue-router'

import routes from '#build/routes'

export default defineNuxtPlugin(nuxtApp => {
  const router = createRouter({
    history: process.server ? createMemoryHistory('/') : createWebHistory('/'),
    routes,
  })

  nuxtApp.vueApp.use(router)
})
