import { CANT_STOP_ACTIONS } from "@/game/constants/battle";
import { modelActions } from "@/types/model";
import { AnimationAction } from "three";

export const switchAction = (
  options: {
    [x: string]: AnimationAction | null;
  },
  action?: modelActions
) => {
  for (const key in options) {
    if (key === action) { options[key]?.play() }
    else { !CANT_STOP_ACTIONS.includes(key as modelActions) && options[key]?.stop() }
  }
}