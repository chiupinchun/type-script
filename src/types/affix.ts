import { Character } from "./battle"

export type AffixType = 'add' | 'mul'

export interface Affix {
  attr: keyof Character
  type: AffixType
}
