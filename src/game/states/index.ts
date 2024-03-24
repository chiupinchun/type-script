import { Character, ReduceOnTurnEnd } from "@/types/battle"

export enum StateType {
  debuff,
  buff
}

export abstract class State implements ReduceOnTurnEnd {
  abstract name: string
  abstract description: string
  abstract type: StateType
  abstract effect: (character: Character) => void
  stock = 1
  abstract maxEffectTurn: number
  abstract effectTurn: number
}

export class Test extends State {
  name = '測試狀態'
  description = '測試用'
  type = StateType.debuff
  effect = () => { }
  maxEffectTurn = 2
  effectTurn = 2
}