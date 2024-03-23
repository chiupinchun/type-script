import { getRandByRate } from "@/utils/random"
import { Affix, setAffix } from "@game/affix"
import { State } from "@game/states"

export type DmgCtx = {
  target: Character,
  isCritical: boolean,
  dmg: number
}
export type DmgLifeCycle = (ctx: DmgCtx) => void

export abstract class Character {
  // basic
  hp: number = 0
  maxHp: number = 0
  def: number = 0
  atk: number = 0

  // critical relation
  critical = 0
  criDmg = 0

  // state relation
  states: State[] = []
  stateImposeRate = 0
  stateRisistRate = 0
  setState<S extends State>(
    target: Character,
    state: new () => S,
    baseRate: number
  ) {
    const totalRate = (baseRate + this.stateImposeRate - target.stateRisistRate) / 100
    const isSuccess = getRandByRate(totalRate)

    if (isSuccess) {
      target.states.push(new state())
    }
  }

  // others
  breakShieldRate = 0

  protected onBeforeDmg: DmgLifeCycle | null = null
  protected onDmged: DmgLifeCycle | null = null

  enableAffixes(affixes: Affix[]) {
    affixes.forEach(affix => setAffix(this, affix))
  }

  dealDmg(target: Character, value: number) {
    const isCritical = getRandByRate(this.critical)
    const dmg = value * (isCritical ? (1 + this.criDmg / 100) : 1)
    const dmgCtx = {
      target, isCritical, dmg
    }
    this.onBeforeDmg && this.onBeforeDmg(dmgCtx)

    target.recieveDmg(dmg)
    this.onDmged && this.onDmged(dmgCtx)
  }

  recieveDmg(value: number) {
    this.hp = Math.max(this.hp - value, 0)
  }

  onTurnEnd() {
    this.handleStates()
  }

  handleStates(isTurnReduce = true) {
    const statesAfterTurn: State[] = []
    this.states.forEach(state => {
      state.effect(this)
      isTurnReduce && state.effectTurn--
      if (state.effectTurn > 0) {
        statesAfterTurn.push(state)
      }
    })
    this.states = statesAfterTurn
  }
}
