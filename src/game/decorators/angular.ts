import { Character } from "@game/character";
import { Decorator } from ".";

export class AngularModule extends Decorator {
  name: string = '安古拉模組'
  color: string = '#632726';
  on2set = {
    effect: (character: Character) => {
      character.atk *= 1.15
    },
    description: '攻擊力提升15%。'
  }
  on3set = {
    effect: (character: Character) => {
      character.onDmgeds.push((ctx) => {
        character.recieveHeal(ctx.dmg / 20)
      })
    },
    description: '造成傷害時，回復造成傷害5%的生命。'
  }
}