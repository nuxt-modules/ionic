import { installModule, useNuxt } from '@nuxt/kit'
import { provider } from 'std-env'

export const setupPWA = async () => {
  const nuxt = useNuxt()

  if (provider === 'stackblitz') {
    ;(nuxt.options as any).pwa = (nuxt.options as any).pwa || {}
    ;(nuxt.options as any).pwa.icon = false
    console.warn(
      'Disabling PWA icon generation as `sharp` is not currently supported on StackBlitz.'
    )
  }
  await installModule('@kevinmarrec/nuxt-pwa')
}
