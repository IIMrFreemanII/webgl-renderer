import EventEmitter from "eventemitter3";

import { Entity } from "engine/ecs/entity";

type EventTypes = "select";

export class EntitySelection {
  private static emitter = new EventEmitter();

  public static select(entity: Entity | null) {
    this.emitter.emit("select", entity);
  }

  public static addListener(event: EventTypes, callback: (result: Entity) => void) {
    this.emitter.addListener(event, callback);
  }

  public static removeListener(event: EventTypes, callback: (result: Entity) => void) {
    this.emitter.removeListener(event, callback);
  }
}
