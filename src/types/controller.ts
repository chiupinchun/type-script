export enum KeyboardOpts {
  front = 'w',
  right = 'd',
  back = 's',
  left = 'a',

  attack = 'j',
  dash = 'k'
}

export interface IController {
  direction: {
    x: number
    y: number
    z: number
  }
  rotation: number
  action?: 'walk' | 'attack'
}