/* @vitest-environment node */
import { fileURLToPath } from 'node:url'
import { setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

describe('nuxt ionic', async () => {
  await setup({
    server: true,
    rootDir: fileURLToPath(new URL('../../playground', import.meta.url)),
  })

  it('renders web components', async () => {
    const html = await $fetch('/')
    expect(html).toContain(
      '<ion-app><!--[--><ion-router-outlet></ion-router-outlet><!--]--></ion-app>'
    )
  })

  it('renders correct viewport tags', async () => {
    const html = await $fetch('/')
    expect(html).toContain(
      '<meta name="viewport" content="viewport-fit: cover, width: device-width, initial-scale: 1.0, minimum-scale: 1.0, maximum-scale: 1.0, user-scalable: no">'
    )
  })
})
