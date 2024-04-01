import { Character } from "@game/character"
import { StringCharacter } from "."
import defaultAvatar from '@/assets/images/defaultAvatar.webp'

export class SliceStr extends StringCharacter {
  avatar: string = defaultAvatar
  public static avatar: string = defaultAvatar
  model: string = '/models/magic-spirit.glb'
  static model: string = '/models/magic-spirit.glb'

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
