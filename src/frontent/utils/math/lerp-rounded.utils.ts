import { round, lerp } from "frontent/utils";

export const lerpRounded = (min: number, max: number, t: number, decimalPoint = 0): number =>
  round(lerp(min, max, t), decimalPoint);
