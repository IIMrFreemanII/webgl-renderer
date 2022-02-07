import { averageValue, isWithinRange, swap2MinMax } from "frontent/utils";

export const clampToClosest = (
  value: number,
  min: number,
  max: number,
  preferredRound: "to-min" | "to-max" = "to-min",
): number => {
  if (Number.isNaN(value) || Number.isNaN(min) || Number.isNaN(max)) {
    return value;
  }

  if (min === max) return min;

  const [minBound, maxBound] = swap2MinMax(min, max);

  if (minBound === -Infinity && maxBound === Infinity) return NaN;

  if (value <= minBound) return minBound;
  if (value >= maxBound) return maxBound;

  const avg = averageValue(minBound, maxBound);

  if (value === avg && preferredRound === "to-min") return minBound;
  if (value === avg && preferredRound === "to-max") return maxBound;

  if (isWithinRange(value, minBound, avg)) return minBound;
  if (isWithinRange(value, avg, maxBound)) return maxBound;

  return value;
};
