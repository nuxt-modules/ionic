export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  build: { transpile: [/dist\/runtime/] },
  modules: ['@nuxtjs/plausible'],
  plausible: {
    domain: 'ionic.nuxtjs.org',
  },
  colorMode: {
    preference: 'dark',
  },
})
