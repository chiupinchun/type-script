import { Character } from "@/types/battle"
import { Bug } from "@game/bugs/bug"

export abstract class AllyCharacter extends Character {

  constructor(
    public readonly lv: number,
    public readonly catching: Bug,
    public readonly decorators: never[],
    public readonly parameters: never[]
  ) {
    super()
  }

  protected initState(rawHp: number, rawAtk: number, rawDef: number) {
    // TODO: weapons or talents may provide some state.
    this.hp = this.maxHp = rawHp
    this.atk = rawAtk
    this.def = rawDef
  }

  abstract skill(target: Character): void
}
