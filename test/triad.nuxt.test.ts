// @vitest-environment node
import { test, expect } from 'vitest'
import { useTriadColors } from '../composables/useTriadColors'
test('my test', () => {
  const color2 = '#000000'
  const { color } = useTriadColors();
  color.value = '#fff'
  expect(color.value).toBe('#fff')
})