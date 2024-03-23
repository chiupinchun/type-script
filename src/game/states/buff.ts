import { State, StateType } from ".";

export class Strength extends State {
  name = '測試狀態'
  description = '測試用'
  type = StateType.debuff
  effect = () => { }
  maxEffectTurn = 1
  effectTurn = 1
}
