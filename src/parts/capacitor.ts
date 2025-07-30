import type { CapacitorConfig } from '@capacitor/cli'
import { findPath, useNuxt } from '@nuxt/kit'
import { join } from 'pathe'

export const setupCapacitor = () => {
  const nuxt = useNuxt()

  /** Find the path to capacitor configuration file (if it exists) */
  const findCapacitorConfig = async () => {
    const path = await findPath(
      'capacitor.config',
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
    nuxt.hook('prepare:types', (ctx) => {
      const paths = [
        join('..', androidPath ?? 'android'),
        join('..', iosPath ?? 'ios'),
      ]

      for (const key of ['tsConfig', 'nodeTsConfig', 'sharedTsConfig'] as const) {
        if (ctx[key]) {
          ctx[key].exclude ||= []
          ctx[key].exclude.push(...paths)
        }
      }
    })

    nuxt.options.ignore.push(
      join(androidPath ?? 'android'),
      join(iosPath ?? 'ios'),
    )
  }

  return {
    excludeNativeFolders,
    findCapacitorConfig,
    parseCapacitorConfig,
  }
}
