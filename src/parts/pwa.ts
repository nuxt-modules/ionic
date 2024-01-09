import { installModule, useNuxt } from '@nuxt/kit'
import type { NuxtConfig, NuxtOptions } from '@nuxt/schema'

export const setupPWA = async () => {
  const nuxt = useNuxt()

  // @ts-expect-error TODO: migrate to @vite-pwa/nuxt
  nuxt.options.pwa = nuxt.options.pwa || ({} as NuxtOptions['pwa'])

  // @ts-expect-error TODO: migrate to @vite-pwa/nuxt
  const pwaOptions: NuxtConfig['pwa'] = nuxt.options.pwa

  // Generate splash screens for iOS
  pwaOptions.meta = pwaOptions.meta || {}
  pwaOptions.meta.mobileAppIOS = pwaOptions.meta.mobileAppIOS ?? true

  await installModule('@kevinmarrec/nuxt-pwa')
}
