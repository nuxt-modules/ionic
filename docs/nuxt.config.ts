export default defineNuxtConfig({
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
