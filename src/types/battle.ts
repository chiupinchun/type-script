import { getRandByRate } from "@/utils/random"
import { Affix, AffixAttr, calcAffix, setAffix, StatusPipe } from "@game/status"
import { State } from "@game/states"

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

const calcStatus = (rawValue: number, attr: AffixAttr, pipes: Set<StatusPipe>) => {
  pipes.forEach(pipe => {
    if (pipe.attr === attr) { rawValue = calcAffix(rawValue, pipe) }
  })
  return rawValue
}

export abstract class Character {
  // basic
  hp: number = 0
  maxHp: number = 0
  protected _atk: number = 0
  get atk() {
    return calcStatus(this._atk, 'atk', this.statusPipes)
  }
  set atk(value: number) {
    this._atk = value
  }
  protected _def: number = 0
  get def() {
    return calcStatus(this._def, 'def', this.statusPipes)
  }
  set def(value: number) {
    this._def = value
  }
  protected _critical = 0
  get critical() {
    return calcStatus(this._critical, 'critical', this.statusPipes)
  }
  set critical(value: number) {
    this._critical = value
  }
  protected _criDmg = 0
  get criDmg() {
    return calcStatus(this._criDmg, 'criDmg', this.statusPipes)
  }
  set criDmg(value: number) {
    this._criDmg = value
  }
  protected _totalDmg = 0
  get totalDmg() {
    return calcStatus(this._totalDmg, 'totalDmg', this.statusPipes)
  }
  set totalDmg(value: number) {
    this._totalDmg = value
  }
  protected _stateImposeRate = 0
  get stateImposeRate() {
    return calcStatus(this._stateImposeRate, 'stateImposeRate', this.statusPipes)
  }
  set stateImposeRate(value: number) {
    this._stateImposeRate = value
  }
  protected _stateRisistRate = 0
  get stateRisistRate() {
    return calcStatus(this._stateRisistRate, 'stateRisistRate', this.statusPipes)
  }
  set stateRisistRate(value: number) {
    this._stateRisistRate = value
  }
  protected _breakShieldRate = 0
  get breakShieldRate() {
    return calcStatus(this._breakShieldRate, 'breakShieldRate', this.statusPipes)
  }
  set breakShieldRate(value: number) {
    this._breakShieldRate = value
  }

  // state relation
  states: Set<State> = new Set()
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
  statusPipes: Set<StatusPipe> = new Set()

  // lifecycles
  onTurnStarts: ((self: Character, opponent: Character) => void)[] = []
  onBeforeDmgs: DmgLifeCycle[] = []
  onDmgeds: DmgLifeCycle[] = []
  onBeforeRecieveDmgs: DmgLifeCycle[] = []
  onRecievedDmgs: DmgLifeCycle[] = []

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

  handleTurnEnd() {
    this.handleStatesTurn()
  }

  handleStatesTurn(needReduce = true) {
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

  handleStatusPipeTurn() {
    this.statusPipes.forEach(state => {
      state.stock > 1 ? state.stock-- : state.effectTurn--
      if (state.effectTurn <= 0) {
        this.statusPipes.delete(state)
      }
    })
  }
}
