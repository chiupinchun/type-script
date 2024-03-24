import { AffixParameter, EffectParameter, link } from ".";
import { StatusPipe } from "@game/status";

const angerParam = new EffectParameter(character => {
  const atkUp = new StatusPipe('atk', 'percent', 3, 1)
  const defUp = new StatusPipe('def', 'percent', 3, 1)
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