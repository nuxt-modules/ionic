import { addComponent } from '@nuxt/kit'
import { resolve } from 'path'
import { runtimeDir } from '../utils'

export const setupUtilityComponents = () => {
  //   const nuxt = useNuxt()

  addComponent({
    name: 'CreateAnimation',
    filePath: resolve(runtimeDir, 'components', 'CreateAnimation.vue'),
  })
}
