import { EmptyObjectType } from "frontent/models";

export const isEmpty = (v: any): v is null | undefined | 0 | false | "" | EmptyObjectType | [] => {
  if (typeof v === "function") return isEmpty(v());

  if (!v) return true; // null, undefined, 0, false, ""

  if (Array.isArray(v)) return !v.length;

  if (typeof v === "object") return !Object.keys(v).length;

  return false;
};
