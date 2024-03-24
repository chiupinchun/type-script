import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Character } from './character'

describe('character', () => {
  class TestCharacter extends Character {
    hp = 50
    maxHp = 50
    protected _atk: number = 50
    protected _def: number = 50
    protected _critical: number = 50
    protected _criDmg: number = 50
    protected _totalDmg: number = 50
    protected _breakShieldRate: number = 50
    protected _stateImposeRate: number = 50
    protected _stateRisistRate: number = 50
  }

  let character: TestCharacter

  beforeEach(() => {
    character = new TestCharacter()
  })

  describe('dmg', () => {
    test('should deal dmg', () => {
      const target = new TestCharacter()
      character.dealDmg(target, 10)
      expect(target.hp).toBeLessThan(target.maxHp)
    })

    test('should recieve dmg', () => {
      const recieveDmg = vi.fn()
      const target = new TestCharacter()
      target.recieveDmg = recieveDmg
      character.dealDmg(target, 10)
      expect(recieveDmg).toBeCalled()
    })

    test('should handle deal dmg lifecycles', () => {
      const target = new TestCharacter()

      const onBeforeDmg = vi.fn()
      character.onBeforeDmgs.push(onBeforeDmg)
      const onDmged = vi.fn()
      character.onDmgeds.push(onDmged)

      character.dealDmg(target, 10)

      expect(onBeforeDmg).toBeCalled()
      expect(onDmged).toBeCalled()
    })

    test('should handle recieve dmg lifecycles', () => {
      const target = new TestCharacter()

      const onBeforeRecieveDmg = vi.fn()
      target.onBeforeRecieveDmgs.push(onBeforeRecieveDmg)
      const onRecievedDmg = vi.fn()
      target.onRecievedDmgs.push(onRecievedDmg)

      character.dealDmg(target, 10)

      expect(onBeforeRecieveDmg).toBeCalled()
      expect(onRecievedDmg).toBeCalled()
    })
  })

  describe('turn', () => {
    test('should handle onTurnStarts', () => {
      const onTurnStart = vi.fn()
      character.onTurnStarts.push(onTurnStart)
      character.handleTurnStart()
      expect(onTurnStart).toBeCalled()
    })

    test('should handle onTurnEnds', () => {
      const onTurnEnd = vi.fn()
      character.onTurnEnds.push(onTurnEnd)
      character.handleTurnEnd()
      expect(onTurnEnd).toBeCalled()
    })
  })
})