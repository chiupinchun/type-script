import { baseKeyboard } from "@/store/keyboard"

export const getReverseDirection = (direction: keyof typeof baseKeyboard, keyboard: typeof baseKeyboard) => {
  switch (direction) {
    case keyboard.front: return keyboard.back
    case keyboard.right: return keyboard.left
    case keyboard.back: return keyboard.front
    case keyboard.left: return keyboard.right
    default: return direction
  }
}

const mergeDeg = (deg1: number, deg2: number) => {
  const avgDeg = (deg1 + deg2) / 2
  if (deg1 - deg2 > 180 || deg1 - deg2 < -180) {
    return avgDeg - 180
  } else { return avgDeg }
}

export const offsetToDeg = (x: number, z: number) => {
  const rotations = []
  if (x > 0) { rotations.push(120) }
  if (x < 0) { rotations.push(240) }
  if (z > 0) { rotations.push(0) }
  if (z < 0) { rotations.push(180) }
  if (rotations.length) {
    return rotations.reduce((total, item) => mergeDeg(total, item)) * Math.PI / 180
  }
  return null
}
