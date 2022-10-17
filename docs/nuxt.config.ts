import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: ['./node_modules/@docus/docs-theme'],
  build: { transpile: [/dist\/runtime/] },
  github: {
    owner: 'nuxt-modules',
    repo: 'ionic',
    branch: 'main',
  },
  modules: ['@nuxthq/admin', '@docus/github', 'vue-plausible'],
  plausible: {
    domain: 'ionic.nuxtjs.org',
  },
  tailwindcss: {
    config: {
      important: true,
      theme: {
        extend: {
          colors: {
            primary: {
              '50': '#84c3ff',
              '100': '#7ab9ff',
              '200': '#70afff',
              '300': '#66a5ff',
              '400': '#5c9bff',
              '500': '#5291ff',
              '600': '#4887f5',
              '700': '#3e7deb',
              '800': '#3473e1',
              '900': '#2a69d7',
            },
          },
        },
      },
    },
  },
  colorMode: {
    preference: 'dark',
  },
})
