import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['nuxt-ionic'],
  ionic: {
    integrations: {
      pwa: {
        enableElements: true,
      },
    },
    // integrations: {
    //   meta: true,
    //   pwa: true,
    //   router: true,
    // },
    // css: {
    //   core: true,
    //   basic: true,
    //   utilities: false,
    // },
  },
})
