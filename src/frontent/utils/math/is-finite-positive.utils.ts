import { isFiniteNumber } from "frontent/utils";

export const isFinitePositive = (value: any): value is number => isFiniteNumber(value) && value > 0;
