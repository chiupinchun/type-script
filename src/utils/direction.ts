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

// export const getRotation = (direction: KeyboardOpts) => {
//   switch (direction) {
//     case KeyboardOpts.front: return 0
//     case KeyboardOpts.right: return -90
//     case KeyboardOpts.back: return 180
//     case KeyboardOpts.left: return 90
//     default: return 0
//   }
// }

export const mergeDeg = (deg1: number, deg2: number) => {
  const avgDeg = (deg1 + deg2) / 2
  if (deg1 - deg2 > 180 || deg1 - deg2 < -180) {
    return avgDeg - 180
  } else { return avgDeg }
}
