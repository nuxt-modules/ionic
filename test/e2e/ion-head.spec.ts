import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
describe('Nuxt Ionic useHead', async () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  await setup({
    server: true,
    browser: true,
    rootDir: join(__dirname, '../../playground'),
    /* rootDir: fileURLToPath(new URL('../../playground', import.meta.url)),
       This throws on my Windows machine, and I don't know why, so I had to use the dirname method
    */
  })

  it('useHead should work with navigation', { timeout: 120_000 }, async () => {
    const page = await createPage()
    await page.goto(url('/'), { waitUntil: 'hydration' })
    await delay(500)
    let titleText1 = await page.title()
    expect(titleText1).toBe('Explore Container - Tab 1');
    (await page.$('.explorer-toggle-1'))?.click()
    await delay(500)
    titleText1 = await page.title()
    expect(titleText1).toBe('Tab 1');
    (await page.$('.explorer-toggle-1'))?.click()
    await delay(500)
    titleText1 = await page.title()
    expect(titleText1).toBe('Explore Container - Tab 1');

    // Navigate to /tabs/tab2
    (await page.$('#tab-button-tab2'))?.click()
    await page.waitForURL(url('/tabs/tab2'))
    await delay(500)
    const titleText2 = await page.title()
    expect(titleText2).toBe('Tab 2 - Photos');

    // Navigate to /tabs/tab3
    (await page.$('#tab-button-tab3'))?.click()
    await page.waitForURL(url('/tabs/tab3'))
    await delay(500)
    let titleText3 = await page.title()
    expect(titleText3).toBe('Explore Container - Tab 3');
    (await page.$('.explorer-toggle-3'))?.click()
    await delay(500)
    titleText3 = await page.title()
    expect(titleText3).toBe('Tab 3');
    (await page.$('.explorer-toggle-3'))?.click()
    await delay(500)
    titleText3 = await page.title()
    expect(titleText3).toBe('Explore Container - Tab 3');

    // Navigate to /tabs/tab4
    (await page.$('#tab-button-tab4'))?.click()
    await page.waitForURL(url('/tabs/tab4'))
    await delay(500)
    const titleText4 = await page.title()
    expect(titleText4).toBe('Tab 4')

    // Navigate back to /tabs/tab3
    await page.goBack()
    await page.waitForURL(url('/tabs/tab3'))
    await delay(500)
    const titleText5 = await page.title()
    expect(titleText5).toBe('Explore Container - Tab 3');

    // Navigate to tabs/tab3/page-two
    (await page.$('[routerlink="/tabs/tab3/page-two"]'))?.click()
    await page.waitForURL(url('/tabs/tab3/page-two'))
    await delay(500)
    let titleText6 = await page.title()
    expect(titleText6).toBe('Explore Container - Tab 3 - Page Two');
    (await page.$('.explorer-toggle-p2'))?.click()
    await delay(500)
    titleText6 = await page.title()
    expect(titleText6).toBe('Page Two - Tab 3');
    (await page.$('.explorer-toggle-p2'))?.click()
    await delay(500)
    titleText6 = await page.title()
    expect(titleText6).toBe('Explore Container - Tab 3 - Page Two')
    await page.goBack();

    // Navigate to tabs/tab3/overlap
    (await page.$('[routerlink="/overlap"]'))?.click()
    await page.waitForURL(url('/overlap'))
    await delay(500)
    let titleText7 = await page.title()
    expect(titleText7).toBe('Explore Container - Overlap Page')
    await page.evaluate(() => {
      const el = document.querySelector('.explorer-toggle-op') as HTMLElement
      if (!el) return
      el.click()
    })
    /*
    await (await page.$('#explorer-toggle-op'))?.click({ force: true });
    This throws Error: elementHandle.click: Element is not visible
    When the element is visible, and can be clicked in this case
    */
    await delay(500)
    titleText7 = await page.title()
    expect(titleText7).toBe('Overlapping - no tabs')
    await page.evaluate(() => {
      const el = document.querySelector('.explorer-toggle-op') as HTMLElement
      if (!el) return
      el.click()
    })
    await delay(500)
    titleText7 = await page.title()
    expect(titleText7).toBe('Explore Container - Overlap Page')
    await page.goBack();

    // Navigate to tabs/tab1
    (await page.$('#tab-button-tab1'))?.click()
    await page.waitForURL(url('/tabs/tab1'))
    await delay(500)
    const titleText8 = await page.title()
    expect(titleText8).toBe('Explore Container - Tab 1')

    await page.close()
  })
})
