import { arrayOf, getRandomNumber } from "frontent/utils";

export const getRandomHex = (): string => {
  const hexChars = "0123456789ABCDEF";
  const hexCode = arrayOf(6, () => hexChars[getRandomNumber(0, hexChars.length - 1)]);
  return "#" + hexCode.join("");
};
