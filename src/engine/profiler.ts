import EventEmitter from "eventemitter3";

export type ProfileResult = {
  name: string;
  time: number;
};

export class Profiler {
  private static emitter = new EventEmitter();

  public static profile(name: string, callback: () => void) {
    const start = performance.now();
    callback();
    const end = performance.now();
    const time = end - start;
    const result = { name, time };
    this.emitter.emit("profile", { name, time });

    return result;
  }
  public static addListener(callback: (result: ProfileResult) => void) {
    this.emitter.addListener("profile", callback);
  }
  public static removeListener(callback: (result: ProfileResult) => void) {
    this.emitter.removeListener("profile", callback);
  }
}
