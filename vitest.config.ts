import path from 'node:path'
import { defineConfig, defaultExclude } from 'vitest/config'
import configuration from './vite.config'

export default defineConfig({
  ...configuration,
  resolve: {
    alias: {
      ...configuration.resolve?.alias,
      test: path.resolve(__dirname, './src/__test__/'),
    },
  },
  test: {
    globals: true,
    exclude: [...defaultExclude, '**/*.svelte**'],
    environmentMatchGlobs: [
      ['**/*.test.tsx', 'happy-dom'],
      ['**/*.component.test.ts', 'happy-dom'],
    ],
  },
})
