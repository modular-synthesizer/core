import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['/tests/setups/fetch.ts'],
    mockReset: true,
  },
});