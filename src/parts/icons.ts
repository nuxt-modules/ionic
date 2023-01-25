import { useNuxt, addImportsSources } from '@nuxt/kit'
import { defineUnimportPreset } from 'unimport'
// @ts-expect-error we are importing from untyped
import * as icons from 'ionicons/icons/index.mjs'

const iconsPreset = defineUnimportPreset({
  from: 'ionicons/icons',
  // @ts-expect-error upstream typing issue
  imports: Object.keys(icons).map(name => ({
    name,
    as: 'ionicons' + name[0].toUpperCase() + name.slice(1),
  })),
})

export const setupIcons = () => {
  const nuxt = useNuxt()

  nuxt.options.build.transpile.push(/ionicons/)

  addImportsSources(iconsPreset)
}
