import { Entity } from "./entity";
import { System } from "./system";
import { Component } from "./component";
import { Constructor, Constructors } from "../types";

type ComponentsCache = Record<string, Component[][]>;

export class World {
  public entities: Entity[] = [];
  public systems: System[] = [];

  createEntity(): Entity {
    const entity = new Entity(this);
    this.entities.push(entity);
    return entity;
  }

  removeEntity(entity: Entity) {
    entity.clearComponents();
    this.entities = this.entities.filter((ent) => ent !== entity);
  }

  addSystem<T extends System>(type: Constructor<T>) {
    const system = new type();
    system.world = this;

    this.systems.push(system);
  }

  fromAllCache: ComponentsCache = {};

  clearCache() {
    this.fromAllCache = {};
  }

  fromAll<T extends Component[]>(...types: Constructors<T>): [[...T]] {
    const typesSignature = types.map((type) => type.name).join(" ");
    const cached = this.fromAllCache[typesSignature];

    if (cached) {
      return cached as any;
    }

    const result: Component[][] = [];
    this.entities.forEach((entity) => {
      const components = entity.getComponents(...types);
      if (!components) return;
      result.push(components);
    });

    this.fromAllCache[typesSignature] = result;
    return result as any;
  }

  tick() {
    this.systems.forEach((system) => system.tick());
  }

  editorTick() {
    this.systems.forEach((system) => system.editorTick());
  }

  onCreate() {
    this.systems.forEach((system) => system.onCreate());
  }

  onDestroy() {
    this.systems.forEach((system) => system.onDestroy());
  }
}
