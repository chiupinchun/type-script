import { Character } from "@/types/battle"
import { StringCharacter } from "."

export class SliceStr extends StringCharacter {
  constructor(
    ...args: ConstructorParameters<typeof StringCharacter>
  ) {
    super(...args)
    const rawHp = this.lv * 2
    const rawAtk = this.lv
    const rawDef = this.lv

    this.initStatus(rawHp, rawAtk, rawDef)
  }

  skill(target: Character) {
    const rawDef = target.def
    target.def = Math.round(target.def * 0.8)
    this.dealDmg(target, 100)
    target.def = rawDef
  }

  skillChain = StringCharacter
}