import { LastElement } from "frontent/models";

export type AnyFunction = (...arg: any[]) => any;

export type LastParameter<F extends (...args: any) => any> = LastElement<Parameters<F>>;

export type OmitFirstArg<F> = F extends (arg: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : F;
