import type { CapacitorConfig } from '@capacitor/cli'
import { findPath, useNuxt } from '@nuxt/kit'
import { join } from 'pathe'

export const setupCapacitor = () => {
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

  const parseCapacitorConfig = async (path: string | null): Promise<{
    androidPath: string | null
    iosPath: string | null
  }> => {
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

  /** Exclude native folder paths from type checking by excluding them in tsconfig */
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
    findCapacitorConfig,
    parseCapacitorConfig,
  }
}
