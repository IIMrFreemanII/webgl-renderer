import { defaultMaterial2D, defaultTexture, rectMesh, Renderer } from "./renderer";
import { mat3, vec2, vec4, glMatrix } from "gl-matrix";
import { Texture } from "./texture";
import { Mesh } from "./mesh";
import { Material } from "./material";

export type RectProps = {
  width: number;
  height: number;
  x: number;
  y: number;
  bgColor?: vec4;
  bgImage?: Texture;
};

export class Rect {
  get rotation(): number {
    return this._rotation;
  }

  set rotation(value: number) {
    this.shouldUpdateModel = true;
    this._rotation = value;
  }

  private _rotation = 0;

  get bgColor(): vec4 {
    return this._bgColor;
  }

  set bgColor(value: vec4) {
    this._bgColor = value;
  }

  private _bgColor: vec4;

  get bgImage(): Texture {
    return this._bgImage;
  }

  set bgImage(value: Texture) {
    this._bgImage = value;
  }

  private _bgImage: Texture;

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this.shouldUpdateModel = true;
    this._width = value;
  }

  private _width = 0;

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this.shouldUpdateModel = true;
    this._height = value;
  }

  private _height = 0;

  private _size = vec2.fromValues(0, 0);

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this.shouldUpdateModel = true;
    this._x = value;
  }

  private _x = 0;

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this.shouldUpdateModel = true;
    this._y = value;
  }

  private _y = 0;
  private _position = vec2.fromValues(0, 0);

  public mesh: Mesh;
  public material: Material;
  public model: mat3 = mat3.create();

  constructor(props: RectProps) {
    this.mesh = rectMesh;
    this.material = defaultMaterial2D;

    this.bgImage = defaultTexture;
    this.bgColor = vec4.fromValues(1, 1, 1, 1); // white

    Object.assign(this, props);

    this.updateModel();
  }

  public draw(renderer: Renderer) {
    if (this.shouldUpdateModel) this.updateModel();

    renderer.drawMesh(this.mesh, this.material, this.model, renderer.cameraView, {
      u_texture0: this.bgImage.id,
      u_bgColor: this.bgColor,
    });
  }

  private shouldUpdateModel = false;
  updateModel() {
    this._position[0] = this._x;
    this._position[1] = this._y;

    this._size[0] = this._width;
    this._size[1] = this._height;

    mat3.identity(this.model);
    mat3.translate(this.model, this.model, this._position);
    mat3.rotate(this.model, this.model, glMatrix.toRadian(this._rotation));
    mat3.scale(this.model, this.model, this._size);
  }
}
