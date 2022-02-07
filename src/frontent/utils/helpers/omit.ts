import { Nullable, ObjectType } from "frontent/models";
import { isEmpty } from "frontent/utils";

export const omit = <T extends ObjectType, K extends keyof T>(
  o: Nullable<T>,
  ...keys: Array<K>
): Omit<T, K> => {
  if (!o) return {} as any;

  if (isEmpty(keys)) return o;

  return Object.entries(o).reduce<T>((acc, [key, value]) => {
    if (keys.indexOf(key as any) !== -1) return acc;
    return Object.assign(acc, { [key]: value });
  }, {} as any);
};
