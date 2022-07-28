import * as icons from 'ionicons/icons'

// @ts-ignore-next-line
const iconList = Object.keys(icons.default || icons).map(name => ({
  name,
  as: 'ionicons' + name[0].toUpperCase() + name.slice(1),
}))

export const setupIcons = () => {
  const nuxt = useNuxt()

  nuxt.hook('autoImports:sources', presets => {
    // Icons
    presets.push(
      defineUnimportPreset({
        from: 'ionicons/icons',
        imports: iconList.map(obj => {
          return [obj.name, obj.as] as [string, string]
        }),
      })
    )
  })
}
