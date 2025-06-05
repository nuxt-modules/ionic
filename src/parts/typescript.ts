import type { CapacitorConfig } from '@capacitor/cli'
import { findPath, useNuxt } from '@nuxt/kit'
import { join } from 'pathe'

export const useTypescrip = () => {
  const nuxt = useNuxt()

  /** Find the path to capacitor configuration file (if it exists) */
  const findCapacitorConfig = async () => {
    const path = await findPath(
      ['capacitor.config.ts', 'capacitor.config.json'],
      {
        extensions: ['ts', 'json'],
        virtual: false,
      },
      'file',
    )

    return path
  }

  const detectIfCapacatorIsEnabled = async () => {
    const paths = await findCapacitorConfig()
    return !!paths
  }

  const parseCapacitorConfig = async () => {
    const path = await findCapacitorConfig()
    if (!path) {
      return {
        androidPath: null,
        iosPath: null,
      }
    }

    const capacitorConfig = (await import(path)) as CapacitorConfig

    return {
      androidPath: capacitorConfig.android?.path || null,
      iosPath: capacitorConfig.ios?.path || null,
    }
  }

  const excludeNativeFolders = (androidPath: string | null, iosPath: string | null) => {
    nuxt.options.typescript.tsConfig ||= {}
    nuxt.options.typescript.tsConfig.exclude ||= []
    nuxt.options.typescript.tsConfig.exclude.push(
      join('../', androidPath ?? '/android'),
      join('../', iosPath ?? '/ios'),
    )
  }

  return {
    excludeNativeFolders,
    detectIfCapacatorIsEnabled,
    parseCapacitorConfig,
  }
}
