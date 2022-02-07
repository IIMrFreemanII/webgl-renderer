import { getRandomNumber } from "frontent/utils";

export const getRandomRgb = (normalize = false): [r: number, g: number, b: number] => {
  const getColor = normalize ? Math.random : () => getRandomNumber(0, 256);
  return [getColor(), getColor(), getColor()];
};
