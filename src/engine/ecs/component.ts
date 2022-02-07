export class Component {
  get type() {
    return this.constructor.name;
  }
}
