import { describe, expect, test } from "vitest";
import { undistortion } from "./math";

describe('undistortion', () => {
  test('should undistortion', () => {
    expect(Math.pow(64, 1 / 3)).not.toBe(4)
    expect(undistortion(Math.pow(64, 1 / 3))).toBe(4)
  })

  test('should have no effect when no undistortion', () => {
    expect(undistortion(1.5)).toBe(1.5)
  })

  test('should have no effect when interger', () => {
    expect(undistortion(1)).toBe(1)
  })
})