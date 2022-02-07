export const addLeadingZero = (value: number | string): string =>
  (Number(value) < 10 ? "0" : "") + value;
