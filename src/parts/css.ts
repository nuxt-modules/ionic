import { useNuxt } from '@nuxt/kit'

export const useCSSSetup = () => {
  const nuxt = useNuxt()

  const setupCore = () => {
    // Core CSS required for Ionic components to work properly
    nuxt.options.css.push('@ionic/vue/css/core.css')
  }

  const setupBasic = () => {
    // Basic CSS for apps built with Ionic
    nuxt.options.css.push(
      '@ionic/vue/css/normalize.css',
      '@ionic/vue/css/structure.css',
      '@ionic/vue/css/typography.css',
    )
  }

  const setupUtilities = () => {
    // Optional CSS utils that can be commented out
    nuxt.options.css.push(
      '@ionic/vue/css/padding.css',
      '@ionic/vue/css/float-elements.css',
      '@ionic/vue/css/text-alignment.css',
      '@ionic/vue/css/text-transformation.css',
      '@ionic/vue/css/flex-utils.css',
      '@ionic/vue/css/display.css',
    )
  }

  return { setupCore, setupBasic, setupUtilities }
}
