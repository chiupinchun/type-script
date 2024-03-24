import { Character, ReduceOnTurnEnd } from "@/types/battle"

export type AffixAttr = 'maxHp' | 'atk' | 'def' | 'critical' | 'criDmg' | 'totalDmg' | 'stateImposeRate' | 'stateRisistRate' | 'breakShieldRate'
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

export class StatusPipe implements Affix, ReduceOnTurnEnd {
  effectTurn: number
  constructor(
    public readonly attr: AffixAttr,
    public readonly type: AffixType,
    public readonly value: number,
    public maxEffectTurn: number,
    public stock: number = 1
  ) {
    this.effectTurn = this.maxEffectTurn
  }
}