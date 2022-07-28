import { useNuxt } from '@nuxt/kit'
import { defineUnimportPreset } from 'unimport'
import * as icons from 'ionicons/icons'

const iconsPreset = defineUnimportPreset({
  from: 'ionicons/icons',
  // @ts-ignore-next-line
  imports: Object.keys(icons.default || icons).map(name => ({
    name,
    as: 'ionicons' + name[0].toUpperCase() + name.slice(1),
  })),
})

export const setupIcons = () => {
  const nuxt = useNuxt()

  nuxt.hook('autoImports:sources', presets => {
    presets.push(iconsPreset)
  })
}
