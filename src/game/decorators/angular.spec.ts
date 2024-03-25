import { SliceStr } from '@game/characters/string/slice'
import { describe, expect, test } from 'vitest'
import { AngularModule } from './angular'

describe('decorator: AngularModule', () => {
  test('should has no set effect when only ware 1', () => {
    const decorator = new AngularModule([])
    const character = new SliceStr(50, null, [decorator], [])
    const comparison = new SliceStr(50, null, [], [])

    expect(character.atk).toBe(comparison.atk)

    character.hp = 1
    character.skill(comparison)

    expect(character.hp).toBe(1)
  })

  test('should has only 2 set effect when ware 2', () => {
    const decorator = new AngularModule([])
    const character = new SliceStr(50, null, [decorator, decorator], [])
    const comparison = new SliceStr(50, null, [], [])

    expect(character.atk).toBe(Math.round(comparison.atk * (1 + 15 / 100)))

    character.hp = 1
    character.skill(comparison)

    expect(character.hp).toBe(1)
  })

  test('should restore correct hp when ware 3 set', () => {
    const decorator = new AngularModule([])
    const character = new SliceStr(50, null, [decorator, decorator, decorator], [])
    const comparison = new SliceStr(50, null, [], [])

    character.hp = 1
    character.skill(comparison)

    const dealedDmg = comparison.maxHp - comparison.hp
    const shouldRestoreHp = Math.round(dealedDmg * 5 / 100)
    expect(character.hp).toBe(1 + shouldRestoreHp)
  })

  test('should has all effects when ware 3 or more', () => {
    const decorator = new AngularModule([])
    const character1 = new SliceStr(50, null, [decorator, decorator, decorator], [])
    const character2 = new SliceStr(50, null, [decorator, decorator, decorator, decorator, decorator, decorator], [])
    const comparison = new SliceStr(50, null, [], [])

    expect(character1.atk).toBe(Math.round(comparison.atk * (1 + 15 / 100)))
    expect(character2.atk).toBe(Math.round(comparison.atk * (1 + 15 / 100)))

    character1.hp = character2.hp = 1
    character1.skill(comparison)
    comparison.hp = comparison.maxHp
    character2.skill(comparison)

    expect(character1.hp).toBeGreaterThan(1)
    expect(character2.hp).toBeGreaterThan(1)
  })
})