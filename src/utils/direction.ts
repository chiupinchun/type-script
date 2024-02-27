import { KeyboardOpts } from "@/types/controller";

export const getReverseDirection = (direction: KeyboardOpts) => {
  switch (direction) {
    case KeyboardOpts.front: return KeyboardOpts.back
    case KeyboardOpts.right: return KeyboardOpts.left
    case KeyboardOpts.back: return KeyboardOpts.front
    case KeyboardOpts.left: return KeyboardOpts.right
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
