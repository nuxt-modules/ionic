import { resolve } from 'node:path'
import { addComponent } from '@nuxt/kit'
import { runtimeDir } from '../utils'

export const setupUtilityComponents = () => {
  addComponent({
    name: 'IonAnimation',
    filePath: resolve(runtimeDir, 'components', 'IonAnimation.vue'),
  })
}
