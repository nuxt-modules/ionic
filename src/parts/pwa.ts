import { installModule, useNuxt } from '@nuxt/kit'
import { provider } from 'std-env'

export const setupPWA = async () => {
  const nuxt = useNuxt()

  nuxt.options.pwa ||= {}

  if (provider === 'stackblitz') {
    nuxt.options.pwa.icon = false
    console.warn(
      'Disabling PWA icon generation as `sharp` is not currently supported on StackBlitz.'
    )
  }

  // Generate splash screens for iOS
  nuxt.options.pwa.meta ||= {}
  nuxt.options.pwa.meta.mobileAppIOS ??= true

  await installModule('@kevinmarrec/nuxt-pwa')
}
