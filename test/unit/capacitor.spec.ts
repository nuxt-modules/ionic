import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useNuxt, findPath } from '@nuxt/kit'
import { useCapacitor } from '../../src/parts/capacitor'

// Mock @nuxt/kit
vi.mock('@nuxt/kit', () => ({
  findPath: vi.fn(),
  useNuxt: vi.fn(),
}))

describe('useCapacitor', () => {
  const mockNuxt = {
    options: {
      typescript: {
        tsConfig: {
          exclude: [],
        },
      },
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useNuxt).mockReturnValue(mockNuxt as any)
    mockNuxt.options.typescript.tsConfig.exclude = []
  })

  describe('findCapacitorConfig', () => {
    it('should find capacitor.config.ts', async () => {
      const mockPath = '/project/capacitor.config.ts'
      vi.mocked(findPath).mockResolvedValue(mockPath)

      const { findCapacitorConfig } = useCapacitor()
      const result = await findCapacitorConfig()

      expect(result).toBe(mockPath)
    })

    it('should return null when no config found', async () => {
      vi.mocked(findPath).mockResolvedValue(null)

      const { findCapacitorConfig } = useCapacitor()
      const result = await findCapacitorConfig()

      expect(result).toBeNull()
    })
  })

  describe('parseCapacitorConfig', () => {
    it('should return null paths when no config path provided', async () => {
      const { parseCapacitorConfig } = useCapacitor()
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

      const { parseCapacitorConfig } = useCapacitor()
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

      const { parseCapacitorConfig } = useCapacitor()
      const result = await parseCapacitorConfig(configPath)

      expect(result).toEqual({
        androidPath: null,
        iosPath: null,
      })
    })
  })

  describe('excludeNativeFolders', () => {
    it('should add native folders to typescript exclude', () => {
      const { excludeNativeFolders } = useCapacitor()
      excludeNativeFolders('android', 'ios')

      expect(mockNuxt.options.typescript.tsConfig.exclude).toContain('../android')
      expect(mockNuxt.options.typescript.tsConfig.exclude).toContain('../ios')
    })

    it('should handle null paths with defaults', () => {
      const { excludeNativeFolders } = useCapacitor()
      excludeNativeFolders(null, null)

      expect(mockNuxt.options.typescript.tsConfig.exclude).toContain('../android')
      expect(mockNuxt.options.typescript.tsConfig.exclude).toContain('../ios')
    })

    it('should initialize tsConfig if not present', () => {
      // @ts-expect-error should not be undefined
      mockNuxt.options.typescript.tsConfig = undefined

      const { excludeNativeFolders } = useCapacitor()
      excludeNativeFolders('android', 'ios')

      expect(mockNuxt.options.typescript.tsConfig).toBeDefined()
      expect(mockNuxt.options.typescript.tsConfig.exclude).toContain('../android')
    })
  })
})
