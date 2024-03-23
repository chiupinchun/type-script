import { Character } from "@/types/battle"

export type AffixAttr = 'maxHp' | 'atk' | 'def' | 'critical' | 'criDmg' | 'stateImposeRate' | 'stateRisistRate' | 'breakShieldRate'
export type AffixType = 'add' | 'percent'

// TODO: it's not only used in affix, but status changes in battle.
// maybe it should be renamed as StatusPipe.
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

export const calcAffix = (rawValue: number, affix: Affix) => {
  if (affix.type === 'add') {
    return rawValue + affix.value
  } else {
    return rawValue * (1 + affix.value / 100)
  }
}

export const setAffix = (character: Character, affix: Affix) => {
  character[affix.attr] = calcAffix(character[affix.attr], affix)
}
