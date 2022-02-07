export const toArrayOptions = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);
