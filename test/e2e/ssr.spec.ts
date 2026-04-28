/* @vitest-environment node */
import { fileURLToPath } from 'node:url'
import { setup, $fetch, createPage, url } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

describe('nuxt ionic', async () => {
  await setup({
    server: true,
    browser: true,
    rootDir: fileURLToPath(new URL('../../playground', import.meta.url)),
  })

  it('renders web components', async () => {
    const html = await $fetch('/')
    expect(html).toContain(
      '<ion-app name="IonApp"><!--[--><ion-router-outlet></ion-router-outlet><!--]--></ion-app>',
    )
  })

  it('renders correct viewport tags', async () => {
    const html = await $fetch('/')
    expect(html).toContain(
      '<meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">',
    )
  })

  it('runs middleware on client-side', async () => {
    const logs: string[] = []
    const page = await createPage()
    page.on('console', (msg) => {
      logs.push(msg.text())
    })
    await page.goto(url('/tabs/tab1'))
    await page.waitForLoadState('networkidle')
    expect(logs).toContain('ran middleware')

    await page.close()
  })

  it('runs plugin and middleware in correct order', async () => {
    const logs: string[] = []
    const page = await createPage()
    page.on('console', (msg) => {
      logs.push(msg.text())
    })
    await page.goto(url('/tabs/tab1'))
    await page.waitForLoadState('networkidle')

    expect(logs).toContain('ran plugin')
    expect(logs).toContain('ran middleware')

    // Plugin should run before middleware
    const pluginIndex = logs.indexOf('ran plugin')
    const middlewareIndex = logs.indexOf('ran middleware')
    expect(pluginIndex).toBeGreaterThanOrEqual(0)
    expect(middlewareIndex).toBeGreaterThanOrEqual(0)
    expect(pluginIndex).toBeLessThan(middlewareIndex)

    await page.close()
  })

  it('has correct route information when landing on page', async () => {
    const logs: string[] = []
    const page = await createPage()
    page.on('console', (msg) => {
      logs.push(msg.text())
    })
    await page.goto(url('/tabs/tab1'))
    await page.waitForLoadState('networkidle')

    // Route name should be logged and not be undefined or null
    const routeNameLog = logs.find(log => log && log !== 'undefined' && log !== 'null' && !log.startsWith('ran'))
    expect(routeNameLog).toBeDefined()
    expect(routeNameLog).not.toBe('undefined')
    expect(routeNameLog).not.toBe('null')

    await page.close()
  })

  it('maintains correct route information during navigation', async () => {
    const logs: string[] = []
    const page = await createPage()
    page.on('console', (msg) => {
      logs.push(msg.text())
    })

    // Navigate to tab1
    await page.goto(url('/tabs/tab1'))
    await page.waitForLoadState('networkidle')

    logs.length = 0

    // Navigate to tab2
    await page.goto(url('/tabs/tab2'))
    await page.waitForLoadState('networkidle')

    // Route should not be undefined during or after navigation
    const hasUndefinedRoute = logs.some(log => log === 'undefined' || log === 'null')
    expect(hasUndefinedRoute).toBe(false)

    await page.close()
  })
})
