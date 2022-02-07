import { isNumber } from "frontent/utils";

export const isFiniteNumber = (value: any): value is number =>
  isNumber(value) && Number.isFinite(value);
