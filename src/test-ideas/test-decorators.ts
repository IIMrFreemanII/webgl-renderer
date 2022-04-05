import "reflect-metadata";

export class User {
  @observable
  name: string;
}

function observable(target: any, prop: string) {
  Reflect.defineMetadata("observable", true, target, prop);
}

type VoidFunc = () => void;

const mapObjectToAutorunCallbacks = new Map<object, VoidFunc[]>();
let currentCallback: VoidFunc = () => {};
let currentObjects: object[] = [];

export function autorun(callback: () => void) {
  currentCallback = callback;
  currentObjects = [];

  callback();
  currentObjects.forEach((obj) => {
    if (mapObjectToAutorunCallbacks.has(obj)) {
      const callbacks = mapObjectToAutorunCallbacks.get(obj);
      callbacks?.push(callback);
    } else {
      mapObjectToAutorunCallbacks.set(obj, [callback]);
    }
  });
}

export function makeObservable(obj) {
  const propsToObserve: string[] = [];
  for (const prop in obj) {
    const isObservable = Reflect.getMetadata("observable", obj, prop);
    if (isObservable) propsToObserve.push(prop);
  }

  propsToObserve.forEach((prop) => {
    const privateProp = `_${prop}`;
    Object.defineProperty(obj, prop, {
      get() {
        currentObjects.push(obj);
        return obj[privateProp];
      },
      set(value: any) {
        obj[privateProp] = value;
        mapObjectToAutorunCallbacks.get(obj)?.forEach((callback) => {
          callback();
        });
      },
    });
  });

  return obj;
}
