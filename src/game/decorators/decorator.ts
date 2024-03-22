import { Affix } from "@/types/affix";
import { Character } from "@/types/battle";

export abstract class Decorator {
  abstract name: string

  constructor(
    public affixes: Affix[]
  ) { }

  abstract on2set: (character: Character) => void
  abstract on3set: (character: Character) => void
}