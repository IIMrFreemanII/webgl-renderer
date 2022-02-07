export const round = (value: number, decimalPoint = 0): number => {
  if (decimalPoint >= 0) {
    return Math.round(value * 10 ** decimalPoint) / 10 ** decimalPoint;
  }

  const exp = Number("10e" + (decimalPoint - 1));
  return Math.round(value * exp) * 10 ** Math.abs(decimalPoint);
};
