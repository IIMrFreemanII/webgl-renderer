import { Mesh } from "./mesh";
import {
  Default2DAttribs,
  Default2DUniforms,
  fragment,
  vertex,
} from "../../assets/shaders/default-2d.shader";
import { Shader } from "./shader";
import { getQuadVertices } from "./renderer";
import { mat3, vec2 } from "gl-matrix";

export type Size = {
  width: number;
  height: number;
};
export type Position = {
  x: number;
  y: number;
};
let shader: Shader<Default2DUniforms>;

export class Rect {
  public size: Size;
  public position: Position;
  public mesh: Mesh<Default2DAttribs, Shader<Default2DUniforms>>;
  public model = mat3.create();

  private readonly gl: WebGL2RenderingContext;

  private _position = vec2.fromValues(0, 0);
  private _size = vec2.fromValues(0, 0);

  constructor(
    gl: WebGL2RenderingContext,
    size: Size = {
      width: 0,
      height: 0,
    },
    position: Position = {
      x: 0,
      y: 0,
    },
  ) {
    this.gl = gl;
    this.position = position;
    this.size = size;

    if (!shader) {
      shader = new Shader<Default2DUniforms>(this.gl, "default2D", vertex, fragment);
    }

    this.mesh = new Mesh<Default2DAttribs, Shader<Default2DUniforms>>(
      this.gl,
      {
        a_position: { data: getQuadVertices(1, 1), type: "vec2" },
      },
      shader,
    );

    this.updateModel();
  }

  updateModel() {
    this._position[0] = this.position.x;
    this._position[1] = this.position.y;

    this._size[0] = this.size.width;
    this._size[1] = this.size.height;

    mat3.identity(this.model);
    mat3.translate(this.model, this.model, this._position);
    mat3.scale(this.model, this.model, this._size);
  }
}
