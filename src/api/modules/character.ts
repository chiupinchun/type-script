import { expToLv } from "@/utils/character"
import { characters } from "@game/characters"
import { AllyCharacter } from "@game/characters/ally"

export const getCharactersByUser = (userId: string) => {
  userId
  return Promise.resolve([
    { id: 1, exp: 2000 },
    { id: 2, exp: 3000 },
    { id: 3, exp: 1000 },
    { id: 4, exp: 2000 },
    { id: 5, exp: 2000 },
  ])
}

export const getCharacterById = (id: number): Promise<AllyCharacter> => {
  const mock1 = {
    id: 1,
    exp: 2000,
    catching: null,
    decorators: [],
    parameters: []
  }
  const mock2 = {
    id: 2,
    exp: 2000,
    catching: null,
    decorators: [],
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