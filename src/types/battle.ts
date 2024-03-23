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
  states: Set<State> = new Set()
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
      target.states.add(new state())
    }
  }

  // others
  breakShieldRate = 0

  // real time status


  // lifecycles
  onBeforeDmgs: DmgLifeCycle[] = []
  onDmgeds: DmgLifeCycle[] = []
  onBeforeRecieveDmgs: DmgLifeCycle[] = []
  onRecievedDmgs: DmgLifeCycle[] = []
  onCalcStatuses: (() => void)[] = []

  enableAffixes(affixes: Affix[]) {
    affixes.forEach(affix => setAffix(this, affix))
  }

  dealDmg(target: Character, value: number) {
    const isCritical = getRandByRate(this.critical)
    const dmg = Math.round(
      value * (isCritical ? (1 + this.criDmg / 100) : 1)
    )
    const dmgCtx = {
      target, isCritical, dmg
    }
    this.onBeforeDmgs.forEach(fn => fn(dmgCtx))

    target.recieveDmg(dmgCtx)
    this.onDmgeds.forEach(fn => fn(dmgCtx))
  }

  recieveDmg(ctx: DmgCtx) {
    this.onBeforeRecieveDmgs.forEach(fn => fn(ctx))
    this.hp = Math.max(this.hp - ctx.dmg, 0)
    this.onRecievedDmgs.forEach(fn => fn(ctx))
  }

  onTurnEnd() {
    this.handleStates()
  }

  handleStates(needReduce = true) {
    this.states.forEach(state => {
      state.effect(this)
      if (needReduce) {
        state.stock > 1 ? state.stock-- : state.effectTurn--
      }
      if (state.effectTurn <= 0) {
        this.states.delete(state)
      }
    })
  }
}
