import { Affix } from "@game/affix"
import { Character } from "@/types/battle"

interface ParameterCore {
  active: boolean
}

interface EffectParameter extends ParameterCore {
  type: 'effect'
  effect: (character: Character) => void
}

interface AffixParameter extends ParameterCore {
  type: 'affix'
  affix: Affix
}

export type Parameter = EffectParameter | AffixParameter