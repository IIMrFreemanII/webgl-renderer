export type Constructor<T> = {
  new (...args: any[]): T;
  prototype: T;
};

export type Constructors<T extends any[]> = {
  [Key in keyof T]: Constructor<T[Key]>;
};
