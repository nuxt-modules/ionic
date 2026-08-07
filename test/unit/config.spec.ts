import { describe, it, expect, vi, beforeEach } from 'vitest'
import { addTemplate, findPath, useNuxt } from '@nuxt/kit'
import {
  findIonicConfigFile,
  setupVueConfigTemplate,
} from '../../src/parts/config'
import { defineNuxtIonicConfig } from '../../src/runtime/config'

// Mock @nuxt/kit
vi.mock('@nuxt/kit', () => ({
  findPath: vi.fn(),
  addTemplate: vi.fn(),
  useNuxt: vi.fn(),
}))

describe('config:findIonicConfigFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('looks up `nuxt-ionic.config` in the root dir', async () => {
    const mockPath = '/project/nuxt-ionic.config.ts'
    vi.mocked(findPath).mockResolvedValue(mockPath)

    const result = await findIonicConfigFile('/project')

    expect(result).toBe(mockPath)
  })

  it('returns null when no config file is found', async () => {
    vi.mocked(findPath).mockResolvedValue(null)

    expect(await findIonicConfigFile('/project')).toBeNull()
  })
})

describe('config:setupVueConfigTemplate', () => {
  const mockNuxt = {
    options: {
      rootDir: '/project',
      watch: [] as string[],
    },
  }

  // Read back the contents the module registered for the virtual config module
  const addedTemplateContents = () => {
    const call = vi.mocked(addTemplate).mock.calls.at(-1)?.[0]
    expect(call).toMatchObject({ filename: 'ionic/vue-config.mjs' })
    return (call as { getContents: () => string }).getContents()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockNuxt.options.watch = []
    vi.mocked(useNuxt).mockReturnValue(mockNuxt as never)
  })

  describe('without an external config file', () => {
    beforeEach(() => {
      vi.mocked(findPath).mockResolvedValue(null)
    })

    it('serialises the inline config', async () => {
      await setupVueConfigTemplate({ mode: 'ios' })

      expect(addedTemplateContents()).toBe('export default {"mode":"ios"}')
    })

    it('falls back to an empty object for an undefined inline config', async () => {
      await setupVueConfigTemplate(undefined)

      expect(addedTemplateContents()).toBe('export default {}')
    })

    it('does not register a watcher', async () => {
      await setupVueConfigTemplate({ mode: 'ios' })

      expect(mockNuxt.options.watch).toEqual([])
    })
  })

  describe('with an external config file', () => {
    const mockPath = '/project/nuxt-ionic.config.ts'

    beforeEach(() => {
      vi.mocked(findPath).mockResolvedValue(mockPath)
    })

    it('re-exports the file and resolves its factory form', async () => {
      await setupVueConfigTemplate(undefined)

      const contents = addedTemplateContents()
      expect(contents).toContain(`import config from "${mockPath}"`)
      expect(contents).toContain(
        'export default typeof config === "function" ? config() : config',
      )
    })

    it('ignores the inline config', async () => {
      await setupVueConfigTemplate({ mode: 'ios' })

      const contents = addedTemplateContents()
      expect(contents).not.toContain('mode')
      expect(contents).not.toContain('ios')
    })

    it('registers a watcher on the config file', async () => {
      await setupVueConfigTemplate(undefined)

      expect(mockNuxt.options.watch).toContain(mockPath)
    })

    it('warns when an inline config is also set', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

      await setupVueConfigTemplate({ mode: 'ios' })

      expect(warn).toHaveBeenCalledOnce()
      expect(warn.mock.calls[0]?.[0]).toContain(mockPath)
      warn.mockRestore()
    })

    it('does not warn when there is no inline config', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

      await setupVueConfigTemplate({})

      expect(warn).not.toHaveBeenCalled()
      warn.mockRestore()
    })
  })
})

describe('config:defineNuxtIonicConfig', () => {
  it('returns an object config unchanged', () => {
    const config = { backButtonText: 'Go back' }
    expect(defineNuxtIonicConfig(config)).toBe(config)
  })

  it('returns a factory config unchanged', () => {
    const factory = () => ({ mode: 'ios' as const })
    expect(defineNuxtIonicConfig(factory)).toBe(factory)
  })
})
