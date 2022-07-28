import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  // TODO: fix in unbuild
  externals: ['node:fs'],
})
