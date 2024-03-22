import { getRandByRate } from "@/utils/random"
import { Bug } from "@game/bugs/bug"

export type DmgCtx = {
  target: Character,
  isCritical: boolean,
  dmg: number
}
export type DmgLifeCycle = (ctx: DmgCtx) => void

export abstract class Character {
  // basic
  hp: number = 0
  maxHp: number = 0
  def: number = 0
  atk: number = 0

  // critical relation
  critical = 0
  criDmg = 0

  // others
  breakShieldRate = 0
  protected onBeforeDmg: DmgLifeCycle | null = null
  protected onDmged: DmgLifeCycle | null = null

  dealDmg(target: Character, value: number) {
    const isCritical = getRandByRate(this.critical)
    const dmgCtx = {
      target, isCritical,
      dmg: value
    }
    this.onBeforeDmg && this.onBeforeDmg(dmgCtx)

    if (target instanceof Bug) {
      target.shieldRecieveDmg(value * (1 + this.breakShieldRate / 100))
    }

    target.recieveDmg(value)
    this.onDmged && this.onDmged(dmgCtx)
  }

  recieveDmg(value: number) {
    this.hp = Math.max(this.hp - value, 0)
  }

  onTurnEnd() {

  }
}