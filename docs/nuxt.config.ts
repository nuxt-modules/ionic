export default defineNuxtConfig({
  compatibilityDate: '2024-08-19',
  extends: '@nuxt-themes/docus',
  build: { transpile: [/dist\/runtime/] },
  modules: ['@nuxtjs/plausible'],
  plausible: {
    domain: 'ionic.nuxtjs.org',
    apiHost: 'https://v.roe.dev',
  },
  colorMode: {
    preference: 'dark',
  },
})
