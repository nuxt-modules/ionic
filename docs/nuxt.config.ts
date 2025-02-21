export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  modules: ['@nuxtjs/plausible'],
  colorMode: {
    preference: 'dark',
  },
  build: { transpile: [/dist\/runtime/] },
  compatibilityDate: '2024-08-19',
  plausible: {
    domain: 'ionic.nuxtjs.org',
    apiHost: 'https://v.roe.dev',
  },
})
