export interface IController {
  direction: {
    x: number
    y: number
    z: number
  }
  rotation: number
  action?: 'walk' | 'attack'
}