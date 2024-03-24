import { getRandByRate } from "@/utils/random"
import { State } from "./states"
import { Affix, AffixAttr, calcAffix, setAffix, StatusPipe } from "./status"
import { DmgCtx, DmgLifeCycle } from "@/types/battle"

const calcStatus = (rawValue: number, attr: AffixAttr, pipes: Set<StatusPipe>) => {
  pipes.forEach(pipe => {
    if (pipe.attr === attr) { rawValue = calcAffix(rawValue, pipe) }
  })
  return Math.round(rawValue)
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
  onTurnStarts: ((self: Character) => void)[] = []
  onBeforeDmgs: DmgLifeCycle[] = []
  onDmgeds: DmgLifeCycle[] = []
  onBeforeRecieveDmgs: DmgLifeCycle[] = []
  onRecievedDmgs: DmgLifeCycle[] = []
  onTurnEnds: ((self: Character) => void)[] = []

  enableAffixes(affixes: Affix[]) {
    affixes.forEach(affix => setAffix(this, affix))
  }

  dealDmg(target: Character, value: number) {
    const isCritical = getRandByRate(this.critical)
    const dmg = Math.round(
      value
      * (this.atk / target.def)
      * (isCritical ? (1 + this.criDmg / 100) : 1)
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

  handleTurnStart() {
    this.onTurnStarts.forEach(fn => fn(this))
  }

  handleTurnEnd() {
    this.onTurnEnds.forEach(fn => fn(this))
    this.handleStatesTurn()
    this.handleStatusPipeTurn()
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