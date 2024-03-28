export const getRandByRate = (rate: number) => {
  return Math.random() * 100 < rate
}

export const undistortion = (num: number) => {
  const DELTA = 0.0000001
  const upper = Math.ceil(num)
  const lower = Math.floor(num)

  if (upper - num < DELTA) { return upper }
  if (num - lower < DELTA) { return lower }
  return num
}