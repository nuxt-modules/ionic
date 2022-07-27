import { fileURLToPath } from 'url'

export const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

export const partsDir = fileURLToPath(new URL('./parts', import.meta.url))
