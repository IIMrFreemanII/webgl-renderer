import { ObjectType } from "../frontent/models";
import { Component } from "./ecs";

const handlers = Symbol("handlers");

const typesToObserve = [Component, Array];
const observableType = (value: any): boolean => {
  for (const type of typesToObserve) {
    if (value instanceof type) {
      return true;
    }
  }
  return false;
};

export type ObserveCallback<T extends ObjectType> = (
  target: T,
  prop: keyof T,
  value: T[keyof T],
) => void;
export type ObservableObject<T extends ObjectType = ObjectType> = T & {
  __original: T;
  [handlers]: Map<keyof T, ObserveCallback<T>>;
  addObserve(key: keyof T, handler: ObserveCallback<T>): void;
  removeObserve(key: keyof T): void;
};

export const isObservable = (obj): obj is ObservableObject => !!obj?.__original;

export function makeObservable<T extends ObjectType>(target: T): ObservableObject<T> {
  if (!observableType(target)) return target as any;

  if (isObservable(target)) return target;

  Object.entries(target).forEach(([key, value]: [keyof T, T[keyof T]]) => {
    if (typeof value === "object") {
      target[key] = makeObservable(value);
    }
  });

  // 1. Initialize handlers store
  Object.defineProperty(target, handlers, {
    value: new Map<keyof T, ObserveCallback<T>>(),
    configurable: true,
    writable: false,
    enumerable: false,
  });

  // Store the handler function in array for future calls
  Object.defineProperty(target, "addObserve", {
    value: function (prop, handler) {
      this[handlers].set(prop, handler);
    },
    configurable: true,
    writable: false,
    enumerable: false,
  });
  Object.defineProperty(target, "removeObserve", {
    value: function (prop) {
      this[handlers].delete(prop);
    },
    configurable: true,
    writable: false,
    enumerable: false,
  });

  // 2. Create a proxy to handle changes
  return new Proxy(target, {
    set(target, property, value, receiver) {
      const success = Reflect.set(target, property, value, receiver); // forward the operation to object
      if (success) {
        // if there were no error while setting the property
        // call all handlers
        target[handlers].get(property)?.(target, property, value);
      }
      return success;
    },
    get(target, prop) {
      if (prop !== "__original") {
        return target[prop];
      }
      return target;
    },
  }) as any;
}

export const removeObservable = <T extends ObservableObject<any>>(
  object: T,
): T extends ObservableObject<infer X> ? X : never => {
  if (isObservable(object)) {
    const result = object.__original;
    delete result[handlers];
    delete result.addObserve;
    delete result.removeObserve;

    Object.entries(object).forEach(([key, value]) => {
      result[key] = removeObservable(value);
    });

    return result as any;
  }

  return object as any;
};
