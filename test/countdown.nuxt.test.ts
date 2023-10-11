// @vitest-environment node
import { test, expect } from 'vitest'
import { useCountdown } from '../composables/useCountdown'
test('my test', () => {
  const date2 = new Date();
  const { date } = useCountdown()
  expect(date.value).toEqual(date2)
})