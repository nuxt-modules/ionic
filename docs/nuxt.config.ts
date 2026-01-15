export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['@nuxtjs/plausible'],
  css: ['~/assets/css/main.css'],
  site: {
    name: 'Nuxt Ionic',
  },
  colorMode: {
    preference: 'dark',
  },
  routeRules: {
    '/overview': { redirect: '/overview/routing' },
    '/cookbook': { redirect: '/cookbook/customising-app-vue' },
  },
  plausible: {
    domain: 'ionic.nuxtjs.org',
    apiHost: 'https://v.roe.dev',
  },
})
