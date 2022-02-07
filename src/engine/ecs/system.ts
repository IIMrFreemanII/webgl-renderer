import { World } from "./world";

export class System {
  public world: World;

  tick(): void {}

  editorTick(): void {}

  onCreate(): void {}

  onDestroy(): void {}

  get type() {
    return this.constructor.name;
  }
}
