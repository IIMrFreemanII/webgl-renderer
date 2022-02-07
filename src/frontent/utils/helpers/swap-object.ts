import { ObjectType, Mutable, SwappedObject } from "frontent/models";

export const swapObject = <T extends ObjectType<string, string>>(
  obj: T,
): Mutable<SwappedObject<T>> =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => Object.assign(acc, { [value]: key }),
    {},
  ) as any;
