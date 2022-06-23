import { installModule, useNuxt } from '@nuxt/kit'
import type { NuxtConfig, NuxtOptions } from '@nuxt/schema'
import { provider } from 'std-env'

export const setupPWA = async () => {
  const nuxt = useNuxt()

  nuxt.options.pwa ||= {} as NuxtOptions['pwa']

  const pwaOptions: NuxtConfig['pwa'] = nuxt.options.pwa

  if (provider === 'stackblitz') {
    pwaOptions.icon = false
    console.warn(
      'Disabling PWA icon generation as `sharp` is not currently supported on StackBlitz.'
    )
  }

  // Generate splash screens for iOS
  pwaOptions.meta ||= {}
  pwaOptions.meta.mobileAppIOS ??= true

  await installModule('@kevinmarrec/nuxt-pwa')
}
