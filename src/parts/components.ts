import { addComponent, type Resolver } from '@nuxt/kit'
import { resolve } from 'path';

export const setupUtilityComponents = (runtimeDir: Resolver) => {
  addComponent({
    name: 'IonAnimation',
    filePath: resolve(runtimeDir.resolve('./runtime'), 'components', 'IonAnimation.vue'),
  })
}
