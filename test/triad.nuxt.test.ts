// @vitest-environment nuxt
import { test, expect } from 'vitest'
import { useTriadColors } from '../composables/useTriadColors'
test('my test', () => {
  const color2 = '#000000'
  const { color } = useTriadColors();

  expect(color.value).toBe(color2)
})