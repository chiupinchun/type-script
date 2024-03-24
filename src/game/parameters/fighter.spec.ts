import { SliceStr } from '@game/characters/string/slice'
import { beforeEach, describe, expect, test } from 'vitest'
import { fighterRoute } from './fighter'
import { SMALL_ADD_AFFIX } from '@game/constants/affix'

describe('fight route param', () => {
  let character: SliceStr

  beforeEach(() => {
    const { last } = fighterRoute
    character = new SliceStr(50, null, [], [last])
  })

  test('should has only prev nodes effect', () => {
    const { first } = fighterRoute
    const withParam = new SliceStr(50, null, [], [first.next!])
    const withoutParam = new SliceStr(50, null, [], [])

    expect(withParam.atk).toBe((withoutParam.atk + SMALL_ADD_AFFIX))
    expect(withParam.def).toBe(withoutParam.def + SMALL_ADD_AFFIX)
  })

  test('should get buff when character was hit', () => {
    const rawAtk = character.atk
    const rawDef = character.def
    const atker = new SliceStr(1, null, [], [])
    atker.skill(character)
    expect(character.atk).toBe(Math.round(rawAtk * 1.03 * 1.03))
    expect(character.def).toBe(Math.round(rawDef * 1.03 * 1.03))
  })

  test('buff should overlay stocks', () => {
    const rawAtk = character.atk
    const rawDef = character.def
    const atker = new SliceStr(1, null, [], [])
    atker.skill(character)
    character.handleTurnEnd()
    atker.skill(character)
    expect(character.atk).toBe(Math.round(rawAtk * 1.03 * 1.03 * 1.03))
    expect(character.def).toBe(Math.round(rawDef * 1.03 * 1.03 * 1.03))
  })

  test('should have buff when hp <= 50%', () => {
    character.hp = Math.floor(character.maxHp * 50 / 100)
    character.handleTurnStart()
    expect(character.atk).toBe(Math.round(character._atk * 1.5))
    expect(character.criDmg).toBe(0)
    expect(character.totalDmg).toBe(0)
  })

  test('should have buff when hp <= 25%', () => {
    character.hp = Math.floor(character.maxHp * 25 / 100)
    character.handleTurnStart()
    expect(character.atk).toBe(Math.round(character._atk * 1.5))
    expect(character.criDmg).toBe(50)
    expect(character.totalDmg).toBe(0)
  })

  test('should have buff when hp <= 5%', () => {
    character.hp = Math.floor(character.maxHp * 5 / 100)
    character.handleTurnStart()
    expect(character.atk).toBe(Math.round(character._atk * 1.5))
    expect(character.criDmg).toBe(50)
    expect(character.totalDmg).toBe(50)
  })
})