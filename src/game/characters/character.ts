import { Affix } from "@/types/affix"
import { Character } from "@/types/battle"
import { Bug } from "@game/bugs/bug"
import { Decorator } from "@game/decorators/decorator"

export abstract class AllyCharacter extends Character {

  constructor(
    public readonly lv: number,
    public readonly catching: Bug | null,
    public readonly decorators: Decorator[],
    public readonly parameters: never[]
  ) {
    super()
  }

  protected initState(rawHp: number, rawAtk: number, rawDef: number) {
    // TODO: weapons or talents may provide some state.
    this.hp = this.maxHp = rawHp
    this.atk = rawAtk
    this.def = rawDef

    const affixes: Affix[] = []

    const decoratorMap: Record<string, Decorator[]> = {}
    this.decorators.forEach(decorator => {
      if (decoratorMap[decorator.name]) {
        decoratorMap[decorator.name].push(decorator)
      } else {
        decoratorMap[decorator.name] = [decorator]
      }

      decorator.affixes.forEach(affix => {
        if (affix.type === 'add') {
          affixes.unshift(affix)
        } else {
          affixes.push(affix)
        }
      })
    })
    Object.values(decoratorMap).forEach(decorators => {
      if (decorators.length > 2) {
        decorators[0].on2set(this)
        if (decorators.length > 3) {
          decorators[0].on3set(this)
        }
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
