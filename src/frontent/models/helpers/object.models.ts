export type ObjectType<T = any, P extends PropertyKey = PropertyKey> = Record<P, T>;

export type EmptyObjectType = ObjectType<never>;

export type ObjectKeys<T extends ObjectType> = keyof T;

export type ObjectValues<T extends ObjectType> = T[ObjectKeys<T>];

export type SwappedObject<T extends ObjectType<string, string>> = { [K in keyof T as T[K]]: K };

export type PartialBy<T extends ObjectType, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PartialKeys<T extends ObjectType> = {
  [K in keyof T]?: Partial<T[K]>;
};

export type NonNullableKeys<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

export type OmitKeysByType<T extends ObjectType, N> = {
  [K in keyof T as T[K] extends N ? never : K]: T[K];
};

export type UnionToObject<T extends string> = ObjectType<never, T>;

export type PickUnion<T extends string, K extends keyof UnionToObject<T>> = keyof Pick<
  UnionToObject<T>,
  K
>;

export type OmitUnion<T extends string, K extends keyof UnionToObject<T>> = keyof Omit<
  UnionToObject<T>,
  K
>;

export type ObjectKeysArr<T> = T extends ObjectType
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;
