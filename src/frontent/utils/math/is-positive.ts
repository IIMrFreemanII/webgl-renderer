export const isPositive = (value: number, includeZero = true): boolean => {
  const sign = Math.sign(value);
  return sign === 1 || (includeZero && Object.is(sign, 0));
};
