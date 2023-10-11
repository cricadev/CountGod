// @vitest-environment happy-dom

import { expect, test } from 'vitest'
import Example from '../components/example.vue'

test('import VUE SFC', () => {
  expect(Example).toBeDefined()
})