import { ObjectType, ObjectKeys, SwappedObject } from "frontent/models";
import { getValue, swapObject } from "frontent/utils";

export const getKey = <
  T extends ObjectType<string, string>,
  V extends ObjectKeys<SwappedObject<T>>,
>(
  obj: T,
  value: V,
): SwappedObject<T>[V] => getValue(swapObject(obj), value);
