import { modelActions } from "./model"

export interface IMovingController {
  direction?: {
    x: number
    y: number
    z: number
  }
  acceleration?: number
  action: modelActions
}