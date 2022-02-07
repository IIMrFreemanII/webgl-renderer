import { Nullable, ObjectType } from "frontent/models";

type ValueIteratee<T> = ((value: T) => unknown) | (T extends ObjectType ? keyof T : PropertyKey);

export const uniqBy = <T>(array: Nullable<T[]>, iteratee: ValueIteratee<T>): T[] => {
  if (!array || !array.length) return [] as any;

  const uniqMap = new Map<any, T>();

  array.forEach((el) => {
    const compareValue = typeof iteratee === "function" ? iteratee(el) : el[iteratee as keyof T];
    if (!uniqMap.has(compareValue)) uniqMap.set(compareValue, el);
  });

  return [...uniqMap.values()];
};
