export const getRandByRate = (rate: number) => {
  return Math.random() * 100 < rate
}