import { Character } from "@game/character"
import { StringCharacter } from "."

export class SliceStr extends StringCharacter {
  model: string = '/models/magic-spirit.glb'

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
    const rawDef = target._def
    target.def = target._def * 0.8
    this.dealDmg(target, 100)
    target.def = rawDef
  }

  skillChain = StringCharacter
}