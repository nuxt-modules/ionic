import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useNuxt, findPath } from '@nuxt/kit'
import { setupCapacitor } from '../../src/parts/capacitor'

// Mock @nuxt/kit
vi.mock('@nuxt/kit', () => ({
  findPath: vi.fn(),
  useNuxt: vi.fn(),
}))

describe('useCapacitor', () => {
  const mockNuxt = {
    hook: vi.fn(),
    options: {
      ignore: [],
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useNuxt).mockReturnValue(mockNuxt as any)
    mockNuxt.options.ignore = []
  })

  describe('findCapacitorConfig', () => {
    it('should find capacitor.config.ts', async () => {
      const mockPath = '/project/capacitor.config.ts'
      vi.mocked(findPath).mockResolvedValue(mockPath)

      const { findCapacitorConfig } = setupCapacitor()
      const result = await findCapacitorConfig()

      expect(result).toBe(mockPath)
    })

    it('should return null when no config found', async () => {
      vi.mocked(findPath).mockResolvedValue(null)

      const { findCapacitorConfig } = setupCapacitor()
      const result = await findCapacitorConfig()

      expect(result).toBeNull()
    })
  })

  describe('parseCapacitorConfig', () => {
    it('should return null paths when no config path provided', async () => {
      const { parseCapacitorConfig } = setupCapacitor()
      const result = await parseCapacitorConfig(null)

      expect(result).toEqual({
        androidPath: null,
        iosPath: null,
      })
    })

    it('should parse capacitor config with custom paths', async () => {
      const configPath = './capacitor.config.ts'
      const mockConfig = {
        android: { path: 'custom-android' },
        ios: { path: 'custom-ios' },
      }

      vi.doMock(configPath, () => ({
        default: mockConfig,
        ...mockConfig,
      }))

      const { parseCapacitorConfig } = setupCapacitor()
      const result = await parseCapacitorConfig(configPath)

      expect(result).toEqual({
        androidPath: 'custom-android',
        iosPath: 'custom-ios',
      })
    })

    it('should handle config without android/ios paths', async () => {
      const configPath = './capacitor.config.ts'
      const mockConfig = {
        android: undefined,
        ios: undefined,
      }

      vi.doMock(configPath, () => ({
        default: mockConfig,
        ...mockConfig,
      }))

      const { parseCapacitorConfig } = setupCapacitor()
      const result = await parseCapacitorConfig(configPath)

      expect(result).toEqual({
        androidPath: null,
        iosPath: null,
      })
    })
  })

  describe('excludeNativeFolders', () => {
    it('should register prepare:types hook and add native folders to ignore', () => {
      const { excludeNativeFolders } = setupCapacitor()
      excludeNativeFolders('android', 'ios')

      expect(mockNuxt.hook).toHaveBeenCalledWith('prepare:types', expect.any(Function))
      expect(mockNuxt.options.ignore).toContain('android')
      expect(mockNuxt.options.ignore).toContain('ios')
    })

    it('should handle null paths with defaults', () => {
      const { excludeNativeFolders } = setupCapacitor()
      excludeNativeFolders(null, null)

      expect(mockNuxt.hook).toHaveBeenCalledWith('prepare:types', expect.any(Function))
      expect(mockNuxt.options.ignore).toContain('android')
      expect(mockNuxt.options.ignore).toContain('ios')
    })

    it('should modify typescript configs in prepare:types hook', () => {
      const { excludeNativeFolders } = setupCapacitor()
      excludeNativeFolders('custom-android', 'custom-ios')

      // Get the hook callback that was registered
      const hookCallback = mockNuxt.hook.mock.calls.find(call => call[0] === 'prepare:types')?.[1]
      expect(hookCallback).toBeDefined()

      // Mock typescript context
      const mockCtx = {
        tsConfig: { exclude: [] },
        nodeTsConfig: { exclude: [] },
        sharedTsConfig: { exclude: [] },
      }

      // Call the hook callback
      hookCallback(mockCtx)

      // Verify all configs were updated
      expect(mockCtx.tsConfig.exclude).toContain('../custom-android')
      expect(mockCtx.tsConfig.exclude).toContain('../custom-ios')
      expect(mockCtx.nodeTsConfig.exclude).toContain('../custom-android')
      expect(mockCtx.nodeTsConfig.exclude).toContain('../custom-ios')
      expect(mockCtx.sharedTsConfig.exclude).toContain('../custom-android')
      expect(mockCtx.sharedTsConfig.exclude).toContain('../custom-ios')
    })

    it('should initialize exclude arrays if not present in typescript configs', () => {
      const { excludeNativeFolders } = setupCapacitor()
      excludeNativeFolders('android', 'ios')

      const hookCallback = mockNuxt.hook.mock.calls.find(call => call[0] === 'prepare:types')?.[1]

      // Mock context without exclude arrays
      const mockCtx = {
        tsConfig: {} as any,
        nodeTsConfig: {} as any,
        sharedTsConfig: {} as any,
      }

      hookCallback(mockCtx)

      expect(mockCtx.tsConfig.exclude).toEqual(['../android', '../ios'])
      expect(mockCtx.nodeTsConfig.exclude).toEqual(['../android', '../ios'])
      expect(mockCtx.sharedTsConfig.exclude).toEqual(['../android', '../ios'])
    })

    it('should handle missing typescript configs gracefully', () => {
      const { excludeNativeFolders } = setupCapacitor()
      excludeNativeFolders('android', 'ios')

      const hookCallback = mockNuxt.hook.mock.calls.find(call => call[0] === 'prepare:types')?.[1]

      // Mock context with only some configs present
      const mockCtx = {
        tsConfig: { exclude: [] },
        // nodeTsConfig and sharedTsConfig are undefined
      }

      expect(() => hookCallback(mockCtx)).not.toThrow()
      expect(mockCtx.tsConfig.exclude).toContain('../android')
      expect(mockCtx.tsConfig.exclude).toContain('../ios')
    })
  })
})
