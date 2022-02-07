import { getRandomNumber } from "frontent/utils";

export const getRandomRgba = (normalize = false): [r: number, g: number, b: number, a: number] => {
  const getColor = normalize ? Math.random : () => getRandomNumber(0, 256);
  return [getColor(), getColor(), getColor(), getColor()];
};
