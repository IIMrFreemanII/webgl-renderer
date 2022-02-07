import { isFiniteNumber, lerpRounded } from "frontent/utils";

export const getRandomNumber = (from: number, to: number, decimalPoint = 0): number => {
  if (!isFiniteNumber(from) || !isFiniteNumber(to)) return NaN;
  return lerpRounded(from, to, Math.random(), decimalPoint);
};
