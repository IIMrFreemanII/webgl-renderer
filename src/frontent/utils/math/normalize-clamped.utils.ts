import { clamp, normalize } from "frontent/utils";

export const normalizeClamped = (value: number, min: number, max: number): number =>
  clamp(normalize(value, min, max), 0, 1);
