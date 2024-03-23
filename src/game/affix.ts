import { Character } from "@/types/battle"

export type AffixAttr = 'maxHp' | 'atk' | 'def' | 'critical' | 'criDmg' | 'breakShieldRate'
export type AffixType = 'add' | 'percent'

export interface Affix {
  attr: AffixAttr
  type: AffixType
  value: number
}

export const collectAffix = (affixes: Affix[], affix: Affix) => {
  if (affix.type === 'add') {
    affixes.unshift(affix)
  } else {
    affixes.push(affix)
  }
}

export const setAffix = (character: Character, affix: Affix) => {
  if (affix.type === 'add') {
    character[affix.attr] += affix.value
  } else {
    character[affix.attr] *= (1 + affix.value / 100)
  }
}
