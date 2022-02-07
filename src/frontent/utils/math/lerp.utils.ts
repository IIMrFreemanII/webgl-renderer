import { isFiniteNumber } from "frontent/utils";

export const lerp = (min: number, max: number, t: number): number => {
  if (!isFiniteNumber(min) || !isFiniteNumber(max) || !isFiniteNumber(t)) {
    return NaN;
  }

  return min * (1 - t) + max * t;
};
