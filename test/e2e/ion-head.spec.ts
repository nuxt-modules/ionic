import { fileURLToPath } from 'node:url'
import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, it } from 'vitest'
import type { Page } from 'playwright-core'

function expectTitleToBe(page: Page, title: string) {
  return page.waitForFunction((title) => (document.querySelector('title') as HTMLTitleElement).innerText.trim() === title, title)
}

describe('Nuxt Ionic useHead', async () => {
  await setup({
    server: true,
    browser: true,
    rootDir: fileURLToPath(new URL('../../playground', import.meta.url)),
  })

  it('useHead should work with navigation', { timeout: 120_000 }, async () => {
    const page = await createPage()

    await page.goto(url('/'), { waitUntil: 'hydration' })
    await expectTitleToBe(page, 'Explore Container - Tab 1')

    await page.click('.explorer-toggle-1')
    await expectTitleToBe(page, 'Tab 1')

    await page.click('.explorer-toggle-1')
    await expectTitleToBe(page, 'Explore Container - Tab 1')

    // Navigate to /tabs/tab2
    await page.click('#tab-button-tab2')
    await expectTitleToBe(page, 'Tab 2 - Photos')

    // Navigate to /tabs/tab3
    await page.click('#tab-button-tab3')
    await expectTitleToBe(page, 'Explore Container - Tab 3')

    await page.click('.explorer-toggle-3')
    await expectTitleToBe(page, 'Tab 3')

    await page.click('.explorer-toggle-3')
    await expectTitleToBe(page, 'Explore Container - Tab 3')

    // Navigate to /tabs/tab4
    await page.click('#tab-button-tab4')
    await expectTitleToBe(page, 'Tab 4')

    // Navigate back to /tabs/tab3
    await page.goBack()
    await expectTitleToBe(page, 'Explore Container - Tab 3')

    // Navigate to tabs/tab3/page-two
    await page.click('[routerlink="/tabs/tab3/page-two"]')
    await expectTitleToBe(page, 'Explore Container - Tab 3 - Page Two')

    await page.click('.explorer-toggle-p2')
    await expectTitleToBe(page, 'Page Two - Tab 3')

    await page.click('.explorer-toggle-p2')
    await expectTitleToBe(page, 'Explore Container - Tab 3 - Page Two')

    // Navigate to tabs/tab3/overlap
    await page.goBack()
    await page.click('[routerlink="/overlap"]')
    await expectTitleToBe(page, 'Explore Container - Overlap Page')

    await page.click('.explorer-toggle-op')
    await expectTitleToBe(page, 'Overlapping - no tabs')

    await page.click('.explorer-toggle-op')
    await expectTitleToBe(page, 'Explore Container - Overlap Page')
    await page.goBack()

    // Navigate to tabs/tab1
    await page.click('#tab-button-tab1')
    await expectTitleToBe(page, 'Explore Container - Tab 1')

    await page.close()
  })
})
