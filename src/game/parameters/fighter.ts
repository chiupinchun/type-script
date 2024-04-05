import { SMALL_ADD_AFFIX, SMALL_PERCENT_AFFIX } from "@game/constants/affix";
import { AffixParameter, EffectParameter, link } from "./parameter";
import { StatusPipe } from "@game/status";

const angerParam = new EffectParameter(character => {
  const atkUp = new StatusPipe('atk', 'percent', 3, 1, 2)
  const defUp = new StatusPipe('def', 'percent', 3, 1, 2)
  character.onRecievedDmgs.push(() => {
    if (character.statusPipes.has(atkUp)) { atkUp.stock += 2 }
    else { character.statusPipes.add(atkUp) }
    if (character.statusPipes.has(defUp)) { defUp.stock += 2 }
    else { character.statusPipes.add(defUp) }
  })
})

const hardFightParam = new EffectParameter(character => {
  character.onTurnStarts.push((self) => {
    const atkUp = new StatusPipe('atk', 'percent', 50, 1)
    const criDmgUp = new StatusPipe('criDmg', 'add', 50, 1)
    const totalDmgUp = new StatusPipe('totalDmg', 'add', 50, 1)

    if (self.hp <= self.maxHp / 2) {
      self.statusPipes.add(atkUp)
      if (self.hp <= self.maxHp / 4) {
        self.statusPipes.add(criDmgUp)
        if (self.hp <= self.maxHp / 20) {
          self.statusPipes.add(totalDmgUp)
        }
      }
    }
  })
})

export const fighterRoute = Object.assign(
  link(
    new AffixParameter({ attr: 'atk', type: 'add', value: SMALL_ADD_AFFIX }),
    new AffixParameter({ attr: 'def', type: 'add', value: SMALL_ADD_AFFIX }),
    angerParam,
    new AffixParameter({ attr: 'atk', type: 'percent', value: SMALL_PERCENT_AFFIX }),
    hardFightParam
  ),
  {
    name: '鬥士之路'
  }
)