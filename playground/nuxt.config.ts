const sw = process.env.SW === 'true'

export default defineNuxtConfig({
  modules: ['@nuxtjs/ionic', "@vite-pwa/nuxt"],
  css: ['~/assets/css/ionic.css'],
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
  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest: {
      name: 'Nuxt Ionic PWA example app',
      short_name: 'NuxtIonicPWAExampleApp',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  }
})
