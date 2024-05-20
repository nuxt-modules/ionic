import { resolve } from 'node:path'
import { addComponent, type Resolver } from '@nuxt/kit'

export const setupUtilityComponents = (runtimeDir: Resolver) => {
  addComponent({
    name: 'IonAnimation',
    filePath: resolve(runtimeDir.resolve('./runtime'), 'components', 'IonAnimation.vue'),
  })
}
