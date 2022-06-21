import { fileURLToPath } from 'url'

export const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
