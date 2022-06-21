import { useNuxt } from '@nuxt/kit'

export const setupMeta = () => {
  const nuxt = useNuxt()

  const metaDefaults = [
    { name: 'color-scheme', content: 'light dark' },
    { name: 'format-detection', content: 'telephone: no' },
    { name: 'msapplication-tap-highlight', content: 'no' },
  ]

  nuxt.options.app.head.meta = nuxt.options.app.head.meta || []
  for (const meta of metaDefaults) {
    if (!nuxt.options.app.head.meta.some(i => i.name === meta.name)) {
      nuxt.options.app.head.meta.unshift(meta)
    }
  }
  nuxt.options.app.head.viewport =
    'viewport-fit: cover, width: device-width, initial-scale: 1.0, minimum-scale: 1.0, maximum-scale: 1.0, user-scalable: no'
}
