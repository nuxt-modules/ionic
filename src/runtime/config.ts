import type { IonicConfig } from '@ionic/core'

export type { IonicConfig }

export type NuxtIonicConfigInput = IonicConfig | (() => IonicConfig)

export function defineNuxtIonicConfig(
  config: NuxtIonicConfigInput,
): NuxtIonicConfigInput {
  return config
}
