import { RenderCallback } from "@react-three/fiber"

export type modelActions = 'attack' | 'walk' | 'standby'

export interface ModelProgress {
  timestamp: number
  action: RenderCallback
}