export type AffixAttr = 'maxHp' | 'atk' | 'def' | 'critical' | 'criDmg' | 'breakShieldRate'
export type AffixType = 'add' | 'percent'

export interface Affix {
  attr: AffixAttr
  type: AffixType
  value: number
}
