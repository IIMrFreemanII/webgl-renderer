import { isEqual } from "frontent/utils";
import { ObjectType } from "frontent/models";

export const findKeyByValue = <T extends ObjectType>(
  obj: T,
  value: T[keyof T],
): keyof T | undefined => Object.keys(obj).find((key) => isEqual(obj[key], value));
