import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.ts'],
      reporter: ['text', 'json', 'html'],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'nuxt4',
        },
      },
      {
        extends: true,
        test: {
          name: 'nuxt5',
          include: ['test/e2e/**/*.spec.ts'],
          env: {
            PLAYGROUND: 'playground-v5',
          },
        },
      },
    ],
  },
})
