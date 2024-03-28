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

export const getCharacterById = (characterId: number) => {
  const mock1 = {
    characterId: 1,
    exp: 2000,
    catching: null,
    decorators: [],
    parameters: []
  }
  const mock2 = {
    characterId: 2,
    exp: 2000,
    catching: null,
    decorators: [],
    parameters: []
  }

  return Promise.resolve(characterId % 2 ? mock1 : mock2)
}