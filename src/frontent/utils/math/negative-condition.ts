export const negativeCondition = (value: number, negative: boolean): number =>
  value * Math.sign(negative ? -1 : 1);
