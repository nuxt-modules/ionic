export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  build: { transpile: [/dist\/runtime/] },
  runtimeConfig: {
    github: {
      owner: 'nuxt-modules',
      repo: 'ionic',
      branch: 'main',
    },
  },
  modules: ['@nuxtjs/plausible'],
  plausible: {
    domain: 'ionic.nuxtjs.org',
  },
  colorMode: {
    preference: 'dark',
  },
})
