import { describe, it } from 'vitest'

// The two tests marked with concurrent will be run in parallel
describe('crypto', () => {
  it.concurrent('sha256', async ({ expect }) => {
    const { SHA256 } = await import('../src')
    expect(SHA256.hash('hello').toString()).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
  })
})