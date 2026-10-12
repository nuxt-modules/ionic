import { addTemplate, findPath, useNuxt } from '@nuxt/kit'
import { resolve } from 'pathe'
import type { IonicConfig } from '../runtime/config'

export const findIonicConfigFile = async (rootDir: string) => {
  return await findPath(
    resolve(rootDir, 'nuxt-ionic.config'),
    {
      extensions: ['ts', 'js', 'mjs'],
      virtual: false,
    },
    'file',
  )
}

export const hasInlineConfig = (config: IonicConfig | undefined) => {
  return !!config && Object.keys(config).length > 0
}

export const setupVueConfigTemplate = async (config?: IonicConfig) => {
  const nuxt = useNuxt()

  // Resolve an external `nuxt-ionic.config.{ts,js,mjs}` file
  const ionicConfigFile = await findIonicConfigFile(nuxt.options.rootDir)
  if (!ionicConfigFile) {
    addTemplate({
      filename: 'ionic/vue-config.mjs',
      getContents: () => `export default ${JSON.stringify(config ?? {})}`,
    })
    return
  }

  nuxt.options.watch ||= []
  nuxt.options.watch.push(ionicConfigFile)

  if (hasInlineConfig(config)) {
    console.warn(
      `[@nuxtjs/ionic] A \`nuxt-ionic.config\` file was found, so the inline \`ionic.config\` \`config\` option is ignored. Move it into ${ionicConfigFile}.`,
    )
  }

  const contents = [
    `import config from ${JSON.stringify(ionicConfigFile)}`,
    'export default typeof config === "function" ? config() : config',
  ].join('\n')

  addTemplate({
    filename: 'ionic/vue-config.mjs',
    getContents: () => contents,
  })
}
