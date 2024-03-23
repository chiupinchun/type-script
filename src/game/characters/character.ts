import { Affix, collectAffix, setAffix } from "@game/affix"
import { Character } from "@/types/battle"
import { Bug } from "@game/bugs/bug"
import { Decorator, enableDecoratorSet } from "@game/decorators/decorator"
import { Parameter } from "@game/parameters/parameter"

export abstract class AllyCharacter extends Character {

  constructor(
    public readonly lv: number,
    public readonly catching: Bug | null,
    public readonly decorators: Decorator[],
    public readonly parameters: Parameter[]
  ) {
    super()
  }

  protected initState(rawHp: number, rawAtk: number, rawDef: number) {
    this.hp = this.maxHp = rawHp
    this.atk = rawAtk
    this.def = rawDef

    const affixes: Affix[] = []

    enableDecoratorSet(
      this,
      decorator => {
        decorator.affixes.forEach(affix => {
          collectAffix(affixes, affix)
        })
      }
    )

    this.parameters.forEach(parameter => {
      if (parameter.type === 'affix') {
        collectAffix(affixes, parameter.affix)
      } else {
        parameter.effect(this)
      }
    })

    affixes.forEach(affix => setAffix(this, affix))
  }

  abstract skill(target: Character): void

  dealDmg(target: Character, value: number): void {
    if (target instanceof Bug) {
      target.shieldRecieveDmg(value * (1 + this.breakShieldRate / 100))
    }
  }
}
