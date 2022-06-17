import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from '@ionic/vue-router'

import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import routes from '#build/routes'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL
  const router = createRouter({
    history: process.server
      ? createMemoryHistory(baseURL)
      : createWebHistory(baseURL),
    routes,
  })

  nuxtApp.vueApp.use(router)
})
