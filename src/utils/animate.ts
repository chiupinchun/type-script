import { actions } from "@/types/model";
import { AnimationAction } from "three";

export const switchAction = (
  options: {
    [x: string]: AnimationAction | null;
  },
  action?: actions
) => {
  for (const key in options) {
    if (key === action) { options[key]?.play() }
    else { options[key]?.stop() }
  }
}