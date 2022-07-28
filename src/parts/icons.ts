import * as icons from 'ionicons/icons'

// @ts-ignore-next-line
export const iconList = Object.keys(icons.default || icons).map(name => ({
  name,
  as: 'ionicons' + name[0].toUpperCase() + name.slice(1),
}))
