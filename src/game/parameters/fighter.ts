import { Strength } from "@game/states/buff";
import { AffixParameter, EffectParameter, link } from ".";
import { StatusPipe } from "@game/status";

const angerParam = new EffectParameter(character => {
  const strength = new Strength()
  character.onRecievedDmgs.push(() => {
    const hasState = character.states.has(strength)
    if (hasState) { strength.stock++ }
    else { character.states.add(strength) }
  })
})

const hardFightParam = new EffectParameter(character => {
  character.onTurnStarts.push((self) => {
    const atkUp = new StatusPipe('atk', 'percent', 50, 1)
    const criDmgUp = new StatusPipe('criDmg', 'percent', 50, 1)
    const totalDmgUp = new StatusPipe('criDmg', 'percent', 50, 1)

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

export const fighterRoute = link(
  new AffixParameter({ attr: 'atk', type: 'add', value: 5 }),
  new AffixParameter({ attr: 'def', type: 'add', value: 5 }),
  angerParam,
  new AffixParameter({ attr: 'atk', type: 'percent', value: 5 }),
  hardFightParam
)