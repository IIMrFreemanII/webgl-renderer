import { Component } from "./component";
import { Constructor, Constructors } from "../types";
import { World } from "./world";
import { makeObservable, removeObservable } from "../observable";

export class Entity {
  private static counter = 0;
  id: number;
  components: Component[] = [];
  world: World;

  constructor(world: World) {
    this.id = Entity.counter;
    this.world = world;
    Entity.counter++;
  }

  addComponent<T extends Component>(type: Constructor<T>): T {
    const component = new type();
    this.components.push(component);

    return component as any;
  }

  removeComponent(component: Component) {
    this.components = this.components.filter((item) => item !== component);
  }

  clearComponents() {
    this.components.forEach((component) => {
      this.removeComponent(component);
    });
  }

  getComponent<T extends Component>(type: Constructor<T>): T | undefined {
    return this.components.find((component) => component.type === type.name) as T;
  }

  getComponents<T extends Component[]>(...types: Constructors<T>): [...T] | undefined {
    const components: Component[] = new Array(types.length);
    for (let i = 0; i < types.length; i++) {
      const component = this.getComponent(types[i]);
      if (!component) return undefined;
      components[i] = component;
    }
    return components as any;
  }

  addObserveComponents() {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i] = makeObservable(this.components[i]);
    }
    this.world.clearCache();
  }

  removeObserveComponents() {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i] = removeObservable(this.components[i]);
    }
    this.world.clearCache();
  }
}
