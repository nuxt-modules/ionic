import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['nuxt-ionic'],
  ionic: {
    integrations: {
    //   meta: true,
       pwa: false,
    //   router: true,
    },
    // css: {
    //   core: true,
    //   basic: true,
    //   utilities: false,
    // },
  },
})
