import { Affix } from "@game/status"
import { DMG_RATE_ON_SHIELD, SHIELD_RECOVER_TURN } from "@game/constants/battle-core"
import { Character } from "@game/character"
import { DmgCtx } from "@/types/battle"

export abstract class Bug extends Character {
  abstract maxShield: number
  abstract shield: number
  recoverShieldTurn?: number

  constructor(
    affixes?: Affix[]
  ) {
    super()

    if (affixes?.length) {
      this.enableAffixes(affixes)
    }
  }

  shieldRecieveDmg(value: number) {
    if (this.shield <= value) {
      this.shield = 0
      this.onShieldBreak()
    }
    this.shield -= value
  }

  onShieldBreak() {
    this.recoverShieldTurn = SHIELD_RECOVER_TURN
  }

  recoverShield() {
    this.shield = this.maxShield
  }

  recieveDmg(ctx: DmgCtx): void {
    const ctxAfterShiled = {
      ...ctx,
      dmg: this.shield > 0 ? ctx.dmg * DMG_RATE_ON_SHIELD : ctx.dmg
    }
    super.recieveDmg(ctxAfterShiled)
  }

  handleTurnStart(): void {
    if (this.recoverShieldTurn) {
      if (this.recoverShieldTurn > 0) {
        this.recoverShieldTurn--
      } else {
        this.recoverShield()
      }
    }

    super.handleTurnStart()
  }

  handleTurnEnd(): void {
    if (this.recoverShieldTurn) {
      this.recoverShieldTurn -= 1
    }
    if (this.recoverShieldTurn === 0) {
      this.shield = this.maxShield
      this.recoverShieldTurn = undefined
    }
    super.handleTurnEnd()
  }
}

export class TestBug extends Bug {
  hp = 9999999
  maxHp = 9999999
  _atk = 10
  _def = 10
  maxShield: number = 10
  shield: number = 10
}