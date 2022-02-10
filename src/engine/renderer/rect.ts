import { projection, rectMesh, view } from "./renderer";
import { mat3, vec2, vec4 } from "gl-matrix";
import { debounce } from "lodash";

export type RectProps = {
  width: number;
  height: number;
  x: number;
  y: number;
  bgColor?: vec4;
};

export class Rect {
  bgColor = vec4.fromValues(1, 1, 1, 1);

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this.updateModel();
    this._width = value;
  }

  private _width = 0;

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this.updateModel();
    this._height = value;
  }

  private _height = 0;

  private _size = vec2.fromValues(0, 0);

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this.updateModel();
    this._x = value;
  }

  private _x = 0;

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this.updateModel();
    this._y = value;
  }

  private _y = 0;
  private _position = vec2.fromValues(0, 0);

  public mesh = rectMesh;
  public model = mat3.create();

  constructor(props: RectProps) {
    Object.assign(this, props);
    this.updateModel();
  }

  updateModel = debounce(() => {
    this._position[0] = this._x;
    this._position[1] = this._y;

    this._size[0] = this._width;
    this._size[1] = this._height;

    mat3.identity(this.model);
    mat3.translate(this.model, this.model, this._position);
    mat3.scale(this.model, this.model, this._size);
  }, 0);

  setUniforms() {
    this.mesh.shader.uniforms.u_model.value = this.model;
    this.mesh.shader.uniforms.u_view.value = view;
    this.mesh.shader.uniforms.u_projection.value = projection;
    this.mesh.shader.uniforms.u_bgColor.value = this.bgColor;
  }
}
