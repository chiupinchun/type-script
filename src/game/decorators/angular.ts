import { Character } from "@game/character";
import { Decorator } from ".";

export class AngularModule extends Decorator {
  name: string = '安古拉模組'
  on2set(character: Character): void {
    character.atk *= 1.15
  }
  on3set(character: Character): void {
    character.onDmgeds.push((ctx) => {
      character.recieveHeal(ctx.dmg / 20)
    })
  }
}