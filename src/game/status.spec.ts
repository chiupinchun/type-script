import { describe, expect, test } from 'vitest'
import { Affix, calcAffix, collectAffix, setAffix } from './status'
import { Character } from './character'

describe('affix', () => {
  const atkAdd: Affix = {
    attr: 'atk',
    type: 'add',
    value: 5
  }
  const atkPercent: Affix = {
    attr: 'atk',
    type: 'percent',
    value: 5
  }
  const criticalAdd: Affix = {
    attr: 'critical',
    type: 'add',
    value: 6
  }
  const criticalPercent: Affix = {
    attr: 'critical',
    type: 'percent',
    value: 6
  }

  test('should collect affixes in correct order', () => {
    const affixes: Affix[] = []
    collectAffix(affixes, atkAdd)
    collectAffix(affixes, atkPercent)
    collectAffix(affixes, criticalPercent)
    collectAffix(affixes, criticalAdd)

    expect(affixes).toEqual([criticalAdd, atkAdd, atkPercent, criticalPercent])
  })

  test('should calc add affix', () => {
    const rawValue = 10
    const newValue = calcAffix(rawValue, atkAdd)
    expect(newValue).toBe(10 + 5)
  })

  test('should calc percent affix', () => {
    const rawValue = 100
    const newValue = calcAffix(rawValue, atkPercent)
    expect(newValue).toBe(100 * 1.05)
  })

  test('should set affix for character', () => {
    class TestCharacter extends Character {
      hp = 100
      maxHp = 100
      protected _atk: number = 10
      protected _def: number = 10
      protected _critical: number = 10
      protected _criDmg: number = 10
    }

    const character = new TestCharacter()

    const affixes: Affix[] = []
    collectAffix(affixes, atkAdd)
    collectAffix(affixes, atkPercent)
    collectAffix(affixes, criticalPercent)
    collectAffix(affixes, criticalAdd)

    affixes.forEach(affix => setAffix(character, affix))

    expect(character.atk).toBe(Math.round((10 + 5) * 1.05))
    expect(character.critical).toBe(Math.round((10 + 6) * 1.06))
  })
})