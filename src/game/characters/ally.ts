import { Affix, collectAffix } from "@game/status"
import { Bug } from "@game/bugs/bug"
import { Decorator, enableDecoratorSet } from "@game/decorators/decorator"
import { Parameter } from "@game/parameters/parameter"
import { Character } from "@game/character"

export abstract class AllyCharacter extends Character {

  constructor(
    public readonly lv: number,
    public readonly catching: Bug | null,
    public readonly decorators: Decorator[],
    public readonly parameters: Parameter[]
  ) {
    super()
  }

  protected initStatus(rawHp: number, rawAtk: number, rawDef: number) {
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

    this.parameters.forEach(parameterNode => {
      let current: Parameter | null = parameterNode
      while (current) {
        if (current.type === 'affix') {
          collectAffix(affixes, current.affix)
        } else {
          current.effect(this)
        }
        current = current.prev
      }
    })

    this.enableAffixes(affixes)
  }

  abstract skill(target: Character): void
  abstract skillChain: typeof AllyCharacter

  dealDmg(target: Character, value: number): void {
    if (target instanceof Bug) {
      target.shieldRecieveDmg(value * (1 + this.breakShieldRate / 100))
    }
    super.dealDmg(target, value)
  }
}
