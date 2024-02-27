export interface IMovingController {
  direction: {
    x: number
    y: number
    z: number
  }
  rotation: number
}

export interface ISkillController {
  action?: 'attack' | 'dash'
}