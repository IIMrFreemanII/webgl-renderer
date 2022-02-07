import { isFiniteNumber } from "frontent/utils";

export const normalize = (value: number, min: number, max: number): number => {
  if (!isFiniteNumber(value) || !isFiniteNumber(min) || !isFiniteNumber(max)) {
    return NaN;
  }

  return (value - min) / (max - min);
};
