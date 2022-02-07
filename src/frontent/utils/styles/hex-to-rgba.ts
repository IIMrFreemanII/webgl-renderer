import { isFiniteZeroPositive } from "frontent/utils";

export const hexToRgba = (hex: string) => {
  if (hex.replace("#", "").length === 3) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_, r, g, b) => {
      return r + r + g + g + b + b;
    });
  }

  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  if (!res) return [0, 0, 0, 0];

  const r = parseInt(res[1], 16);
  const g = parseInt(res[2], 16);
  const b = parseInt(res[3], 16);
  let a = parseInt(res[4], 16);
  a = isFiniteZeroPositive(a) ? a : 255;

  return [r, g, b, a];
};
