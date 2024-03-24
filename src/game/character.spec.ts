import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Character } from './character'
import { State, StateType } from './states'
import { StatusPipe } from './status'

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

    describe('state & statusPipe', () => {
      class TestState extends State {
        name = '測試'
        description: string = ''
        type = StateType.buff
        effect: (character: Character) => void = () => { }
        maxEffectTurn = 2
        effectTurn = 2

        constructor(public stock = 1) {
          super()
        }
      }

      test('should reduce effectTurn when turn end', () => {
        const testState = new TestState()
        character.states.add(testState)
        const atkPipe = new StatusPipe('atk', 'add', 1, 2)
        character.statusPipes.add(atkPipe)

        character.handleTurnEnd()

        expect(testState.effectTurn).toBe(1)
        expect(character.states.size).toBe(1)
        expect(atkPipe.effectTurn).toBe(1)
        expect(character.statusPipes.size).toBe(1)
      })

      test('should lose state & pipe when turn to 0', () => {
        const testState = new TestState()
        character.states.add(testState)
        const atkPipe = new StatusPipe('atk', 'add', 1, 2)
        character.statusPipes.add(atkPipe)

        character.handleTurnEnd()
        character.handleTurnEnd()
        expect(character.states.size).toBe(0)
        expect(character.statusPipes.size).toBe(0)
      })

      test('should previously reduce stock if stock > 1', () => {
        const testState = new TestState(2)
        character.states.add(testState)
        const atkPipe = new StatusPipe('atk', 'add', 1, 2, 2)
        character.statusPipes.add(atkPipe)

        character.handleTurnEnd()

        expect(testState.stock).toBe(1)
        expect(character.states.size).toBe(1)
        expect(atkPipe.stock).toBe(1)
        expect(character.statusPipes.size).toBe(1)
      })
    })
  })
})