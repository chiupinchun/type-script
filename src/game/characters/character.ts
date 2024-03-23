import { Affix } from "@/types/affix"
import { Character } from "@/types/battle"
import { Bug } from "@game/bugs/bug"
import { Decorator, enableDecoratorSet } from "@game/decorators/decorator"
import { Parameter } from "@game/parameters/parameter"

const setAffix = (affixes: Affix[], affix: Affix) => {
  if (affix.type === 'add') {
    affixes.unshift(affix)
  } else {
    affixes.push(affix)
  }
}

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
          setAffix(affixes, affix)
        })
      }
    )

    this.parameters.forEach(parameter => {
      if (parameter.type === 'affix') {
        setAffix(affixes, parameter.affix)
      } else {
        parameter.effect(this)
      }
    })

    affixes.forEach(affix => {
      if (affix.type === 'add') {
        this[affix.attr] += affix.value
      } else {
        this[affix.attr] *= (1 + affix.value / 100)
      }
    })
  }

  abstract skill(target: Character): void

  dealDmg(target: Character, value: number): void {
    if (target instanceof Bug) {
      target.shieldRecieveDmg(value * (1 + this.breakShieldRate / 100))
    }
  }
}
