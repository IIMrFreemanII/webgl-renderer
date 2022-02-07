import { isEmpty } from "frontent/utils";

export const isDeepEmpty = (value: any): boolean => {
  if (isEmpty(value)) return true;
  if (typeof value !== "object") return false;

  if (Array.isArray(value)) return value.every(isDeepEmpty);

  return Object.values(value).every(isDeepEmpty);
};
