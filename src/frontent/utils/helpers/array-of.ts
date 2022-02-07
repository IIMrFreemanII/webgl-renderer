export const arrayOf = <T>(length: number, mapFunc: (index: number) => T): T[] =>
  Array.from({ length }, (_, index) => mapFunc(index));
