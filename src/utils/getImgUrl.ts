export const getImgUrl = (fileName: string) => {
  return new URL(`/src/assets/images/${fileName}`, import.meta.url).href
}