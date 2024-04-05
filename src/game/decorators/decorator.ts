import { Affix } from "@game/status";
import { AllyCharacter } from "@game/characters/ally";
import { Character } from "@game/character";

interface DecoratorSet {
  effect: (character: Character) => void
  description: string
}

export abstract class Decorator {
  abstract name: string
  abstract color: string

  constructor(
    public affixes: Affix[]
  ) { }

  abstract on2set: DecoratorSet
  abstract on3set: DecoratorSet
}

export const enableDecoratorSet = (
  character: AllyCharacter,
  afterEach: (decorator: Decorator) => void
) => {
  const decoratorMap: Record<string, Decorator[]> = {}

  character.decorators.forEach(decorator => {
    if (decoratorMap[decorator.name]) {
      decoratorMap[decorator.name].push(decorator)
    } else {
      decoratorMap[decorator.name] = [decorator]
    }

    afterEach(decorator)
  })

  Object.values(decoratorMap).forEach(decorators => {
    if (decorators.length >= 2) {
      decorators[0].on2set.effect(character)
      if (decorators.length >= 3) {
        decorators[0].on3set.effect(character)
      }
    }
  })
}