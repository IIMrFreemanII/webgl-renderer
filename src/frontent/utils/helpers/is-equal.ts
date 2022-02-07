import { isEmpty } from "frontent/utils";

export const isEqual = (v1: any, v2: any): boolean => {
  const v1Type = Object.prototype.toString.call(v1);
  const v2Type = Object.prototype.toString.call(v2);

  if (v1Type !== v2Type) return false;

  if (typeof v1 === "function") return "" + v1 === "" + v2;

  // null, undefined, string, number, bool, NaN
  if (v1Type !== "[object Object]" && v1Type !== "[object Array]") {
    if (v1Type === "[object Number]" && isNaN(v1) && isNaN(v2)) return true;
    return v1 === v2;
  }

  if (Array.isArray(v1) && Array.isArray(v2)) {
    if (v1.length !== v2.length) return false;

    if (!v1.length && !v2.length) return true;

    return v1.every((v1El, i) => isEqual(v1El, v2[i]));
  }

  if (isEmpty(v1) && isEmpty(v2)) return true;
  if (Object.keys(v1).length !== Object.keys(v2).length) return false;

  return Object.entries(v1).every(
    ([key, value]) => v2.hasOwnProperty(key) && isEqual(value, v2[key]),
  );
};
