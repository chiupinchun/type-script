import { Strength } from "@game/states/buff";
import { AffixParameter, EffectParameter, link } from ".";

const angerParam = new EffectParameter(character => {
  const strength = new Strength()
  character.onRecievedDmgs.push(() => {
    const hasState = character.states.has(strength)
    if (hasState) { strength.stock++ }
    else { character.states.add(strength) }
  })
})

const hardFightParam = new EffectParameter(character => {
  character.onBeforeDmgs.push(() => {
    // TODO
  })
})

export const fighterRoute = link(
  new AffixParameter({ attr: 'atk', type: 'add', value: 5 }),
  new AffixParameter({ attr: 'def', type: 'add', value: 5 }),
  angerParam,
  new AffixParameter({ attr: 'atk', type: 'percent', value: 5 }),
  hardFightParam
)