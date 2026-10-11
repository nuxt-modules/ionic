export default defineNuxtConfig({
  modules: ['@nuxtjs/ionic'],
  css: ['~/assets/css/ionic.css'],
  future: {
    compatibilityVersion: 5,
  },
  compatibilityDate: '2024-08-19',
  vite: {
    optimizeDeps: {
      include: [
        '@capacitor/camera',
        '@capacitor/core',
        '@capacitor/filesystem',
        '@capacitor/preferences',
        '@ionic/vue',
        '@ionic/vue-router',
        'ionicons/icons',
      ],
    },
  },
  ionic: {
    // integrations: {
    //   icons: true,
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
