import { Character } from "@/types/battle"
import { DMG_RATE_ON_SHIELD, SHIELD_RECOVER_TURN } from "@game/constants/battle-core"

export abstract class Bug extends Character {
  abstract maxShield: number
  abstract shield: number
  recoverShieldTurn?: number

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

  recieveDmg(value: number): void {
    super.recieveDmg(this.shield > 0 ? value * DMG_RATE_ON_SHIELD : value)
  }

  onTurnEnd(): void {
    if (this.recoverShieldTurn) {
      this.recoverShieldTurn -= 1
    }
    if (this.recoverShieldTurn === 0) {
      this.shield = this.maxShield
      this.recoverShieldTurn = undefined
    }
    super.onTurnEnd()
  }
}