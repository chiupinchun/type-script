import { Affix } from "@game/affix";
import { Character } from "@/types/battle";
import { AllyCharacter } from "@game/characters/character";

export abstract class Decorator {
  abstract name: string

  constructor(
    public affixes: Affix[]
  ) { }

  abstract on2set: (character: Character) => void
  abstract on3set: (character: Character) => void
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
    if (decorators.length > 2) {
      decorators[0].on2set(character)
      if (decorators.length > 3) {
        decorators[0].on3set(character)
      }
    }
  })
}