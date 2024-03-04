export type modelActions = 'attack' | 'walk' | 'standby'

export interface IMovingController {
  direction: {
    x: number
    y: number
    z: number
  }
  acceleration: number
  action: modelActions
}