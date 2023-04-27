import { defineProject } from 'vitest/config'

export default defineProject({
  plugins: [
    {
      name: 'test-with-global-setup',
      config: () => ({
        test: {
          setupFiles: [
            './vitest.setup.ts',
          ],
        },
      }),
    },
  ],
  test: {
    environment: 'happy-dom',
  }
})