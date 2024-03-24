import { Character } from "@game/character"

export type DmgCtx = {
  target: Character,
  isCritical: boolean,
  dmg: number
}
export type DmgLifeCycle = (ctx: DmgCtx) => void

export interface ReduceOnTurnEnd {
  stock: number
  maxEffectTurn: number
  effectTurn: number
}
