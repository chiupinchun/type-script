export type DmgCtx = {
  target?: Character, isCritical?: boolean, dmg?: number
}
type DmgLifeCycle = (ctx: DmgCtx) => void

export abstract class Character {
  // basic
  hp: number = 0
  maxHp: number = 0
  def: number = 0
  atk: number = 0

  // critical relation
  critical = 0
  criDmg = 0

  // others
  lastAtkBy: Character | null = null
  protected onBeforeDmg: DmgLifeCycle | null = null
  protected onDmged: DmgLifeCycle | null = null

  constructor(
    public lv: number
  ) { }

  protected initState(rawHp: number, rawAtk: number, rawDef: number) {
    // TODO: weapons or talents may provide some state.
    this.hp = this.maxHp = rawHp
    this.atk = rawAtk
    this.def = rawDef
  }

  abstract skill(target: Character): void

  dealDmg(target: Character, value: number) {

  }

  recieveDmg(value: number) {

  }
}
