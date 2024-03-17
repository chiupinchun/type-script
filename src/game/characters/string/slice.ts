import { Character } from "../character";

export class SliceStr extends Character {
  constructor(
    lv: number
  ) {
    super(lv)
    const rawHp = this.lv * 2
    const rawAtk = this.lv
    const rawDef = this.lv

    this.initState(rawHp, rawAtk, rawDef)
  }

  skill(target: Character) {
    const rawDef = target.def
    target.def = Math.round(target.def * 0.8)
    this.dealDmg(target, 100)
    target.def = rawDef
  }
}