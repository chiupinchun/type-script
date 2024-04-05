import { expToLv } from "@/utils/character"
import { characters } from "@game/characters"
import { AllyCharacter } from "@game/characters/ally"
import { AngularModule } from "@game/decorators/angular"

export interface CharacterInList {
  id: number
  characterId: number
  exp: number
}

export const getCharactersByUser = (userId: string) => {
  userId
  return Promise.resolve([
    { id: 1, characterId: 1, exp: 2000 },
    { id: 2, characterId: 2, exp: 3000 },
    { id: 3, characterId: 3, exp: 1000 },
    { id: 4, characterId: 4, exp: 2000 },
    { id: 5, characterId: 5, exp: 2000 },
    { id: 6, characterId: 6, exp: 2000 },
    { id: 7, characterId: 7, exp: 2000 },
    { id: 8, characterId: 8, exp: 2000 },
    { id: 9, characterId: 9, exp: 2000 },
    { id: 10, characterId: 10, exp: 2000 },
    { id: 11, characterId: 11, exp: 2000 },
    { id: 12, characterId: 12, exp: 2000 },
    { id: 13, characterId: 13, exp: 2000 },
    { id: 14, characterId: 14, exp: 2000 },
    { id: 15, characterId: 15, exp: 2000 },
    { id: 16, characterId: 16, exp: 2000 },
    { id: 17, characterId: 17, exp: 2000 },
    { id: 18, characterId: 18, exp: 2000 },
  ])
}

export const getCharacterById = (id: number): Promise<AllyCharacter> => {
  const mock1 = {
    id: 1,
    exp: 2000,
    catching: null,
    decorators: [new AngularModule([
      { attr: 'atk', type: 'add', value: 5 },
      { attr: 'atk', type: 'percent', value: 5 }
    ])],
    parameters: []
  }
  const mock2 = {
    id: 2,
    exp: 2000,
    catching: null,
    decorators: [new AngularModule([
      { attr: 'atk', type: 'add', value: 5 },
      { attr: 'atk', type: 'percent', value: 5 }
    ])],
    parameters: []
  }

  return Promise.resolve(id % 2 ? mock1 : mock2)
    .then(res => {
      const { id, exp, catching, decorators, parameters } = res
      const Character = characters[id]
      return new Character(
        expToLv(exp).lv,
        catching,
        decorators,
        parameters
      )
    })
}