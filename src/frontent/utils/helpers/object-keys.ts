import { ObjectKeysArr, ObjectType } from "frontent/models";

export const objectKeys = <T extends ObjectType>(o: T): ObjectKeysArr<T> =>
  Object.keys(o) as ObjectKeysArr<T>;
