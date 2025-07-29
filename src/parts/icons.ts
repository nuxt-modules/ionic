import { useNuxt, addImportsSources } from '@nuxt/kit'
import { defineUnimportPreset } from 'unimport'
import * as _icons from 'ionicons/icons'

const icons = _icons as typeof import('ionicons/icons')

const iconsPreset = defineUnimportPreset({
  from: 'ionicons/icons',
  imports: Object.keys(icons).map(name => ({
    name,
    as: 'ionicons' + name[0]!.toUpperCase() + name.slice(1),
  })),
})

export const setupIcons = () => {
  const nuxt = useNuxt()

  nuxt.options.build.transpile.push(/ionicons/)

  addImportsSources(iconsPreset)
}
