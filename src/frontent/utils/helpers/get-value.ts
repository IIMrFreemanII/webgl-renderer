import { ObjectType, ObjectKeys } from "frontent/models";

export const getValue = <T extends ObjectType, K extends ObjectKeys<T>>(obj: T, key: K): T[K] =>
  obj[key];
