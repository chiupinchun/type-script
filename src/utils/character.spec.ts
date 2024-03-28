import { describe, expect, test } from "vitest";
import { expToLv, lvToExp } from "./character";

describe('expToLv', () => {
  test('should be reverse fn of lvToExp', () => {
    for (let i = 1; i <= 99; i++) {
      const exp = lvToExp(i)
      const { lv } = expToLv(exp)
      expect(lv).toBe(i)
    }
  })
})