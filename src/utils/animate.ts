import { AnimationAction } from "three";

export const switchAction = (
  actions: {
    [x: string]: AnimationAction | null;
  },
  action?: string
) => {
  for (const key in actions) {
    if (key === action) { actions[key]?.play() }
    else { actions[key]?.stop() }
  }
}