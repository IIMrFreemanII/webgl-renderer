import React from "react";

export type Negatives = null | undefined;

export type Primitives = number | string | boolean | bigint | Negatives;

export type ExtractComponent<Type> = Type extends React.FC<infer X> ? X : never;

export type Nullable<T> = T | Negatives;

export type Cast<X, Y> = X extends Y ? X : Y;

export type RefModel<T extends any> = { current: T | null } | React.Dispatch<T | null>;

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

export type DeepMutable<T> = { -readonly [K in keyof T]: DeepMutable<T[K]> };

export type MaybeMutable<T extends any[]> = Mutable<T> | Readonly<T>;
