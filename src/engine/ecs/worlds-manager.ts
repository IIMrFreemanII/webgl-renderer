import { World } from "./world";
import EventEmitter from "eventemitter3";

type EventTypes = "onWorldsUpdate";

export class WorldsManager {
  private static emitter = new EventEmitter();
  public static defaultWorld = new World();
  public static worlds: World[] = [this.defaultWorld];

  // public static addWorld() {
  //   const world = new World();
  //   this.worlds.push(world);
  //   this.emitter.emit("onWorldsUpdate", this.worlds);
  //
  //   return world;
  // }

  public static onCreate() {
    this.worlds.forEach((world) => world.onCreate());
  }

  public static tick() {
    this.worlds.forEach((world) => world.tick());
  }

  public static editorTick() {
    this.worlds.forEach((world) => world.editorTick());
  }

  public static onDestroy() {
    this.worlds.forEach((world) => world.onDestroy());
    this.worlds = [];
  }

  public static addListener(event: EventTypes, callback: (worlds: World[]) => void) {
    this.emitter.addListener(event, callback);
  }

  public static removeListener(event: EventTypes, callback: (worlds: World[]) => void) {
    this.emitter.removeListener(event, callback);
  }
}
