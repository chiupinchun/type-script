import { Character } from "@game/character"
import { Affix } from "@game/status"

interface IParameterCore {
  prev: Parameter | null
  next: Parameter | null
}

interface IEffectParameter extends IParameterCore {
  type: 'effect'
  effect: (character: Character) => void
}

export class EffectParameter implements IEffectParameter {
  prev = null
  next = null
  type = 'effect' as const
  constructor(
    public effect: (character: Character) => void
  ) { }
}

interface IAffixParameter extends IParameterCore {
  type: 'affix'
  affix: Affix
}

export class AffixParameter implements IAffixParameter {
  prev = null
  next = null
  type = 'affix' as const
  constructor(
    public affix: Affix
  ) { }
}

export type Parameter = IEffectParameter | IAffixParameter

export const link = (...parameterNodes: Parameter[]) => {
  if (!parameterNodes.length) { return null }

  let prevNode = parameterNodes[0]
  for (let i = 1; i < parameterNodes.length; i++) {
    const currentNode = parameterNodes[i]
    currentNode.prev = prevNode
    prevNode.next = currentNode
    prevNode = currentNode
  }

  return parameterNodes[0]
}
