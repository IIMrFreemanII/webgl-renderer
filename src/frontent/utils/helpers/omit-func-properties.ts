import { Nullable, ObjectType, OmitKeysByType, AnyFunction } from "frontent/models";

export const omitFuncProperties = <T extends ObjectType<any>>(
  obj: Nullable<T>,
): OmitKeysByType<T, AnyFunction> => {
  if (!obj) return {} as any;
  return Object.entries(obj).reduce<ObjectType>((prev, [key, value]) => {
    if (typeof value === "function") return prev;
    return { ...prev, [key]: value };
  }, {}) as any;
};
