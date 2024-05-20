import { fileURLToPath } from 'node:url'

export const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
