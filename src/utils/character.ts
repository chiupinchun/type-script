import { undistortion } from "./math"

export function expToLv(exp: number) {
  let lv = 1 + Math.floor(undistortion(Math.pow(2 * exp, 1 / 3)))
  lv = Math.min(lv, 99)

  const expFromPrevLv = exp - lvToExp(lv)
  const expToNextLv = Math.max(lvToExp(lv + 1) - exp, 0)

  return { lv, expFromPrevLv, expToNextLv }
}

export const lvToExp = (lv: number) => {
  if (lv > 99) { return 0 }
  return Math.ceil(Math.pow(lv - 1, 3) / 2)
}
