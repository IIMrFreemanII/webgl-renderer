export type ConcatenateValue = string | number | boolean;

export const concatenate = (...values: ConcatenateValue[]): string => values.map(String).join("");
