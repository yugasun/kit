import { afterAll, beforeAll, beforeEach, } from 'vitest'
import { Crypto } from '@peculiar/webcrypto';

beforeAll(() => {
  // @ts-expect-error type
  global.crypto = new Crypto();
})

beforeAll(async () => {
})

beforeEach(async () => {
})

afterAll(() => {
})