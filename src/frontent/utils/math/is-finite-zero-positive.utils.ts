import { isFiniteNumber } from "frontent/utils";

export const isFiniteZeroPositive = (value: any): value is number =>
  isFiniteNumber(value) && value >= 0;
