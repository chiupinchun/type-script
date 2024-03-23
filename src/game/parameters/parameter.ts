import { Affix } from "@game/affix"
import { Character } from "@/types/battle"

interface ParameterCore {
  prev: Parameter | null
  next: Parameter | null
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