export const averageValue = (...nums: number[]): number =>
  nums.reduce((a, b) => a + b, 0) / nums.length;
