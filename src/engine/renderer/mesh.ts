import { BufferElement, BufferLayout, IndexBuffer, VertexBuffer } from "./buffer";
import { VertexArray } from "./vertex-array";
import { Shader } from "./shader";

export class Mesh<A extends object, S extends Shader<any>> {
  gl: WebGL2RenderingContext;
  vertexAttribs: A;
  shader: S;
  indices: number[] | null;
  vertexArray: VertexArray<S>;
  count: number;
  drawMode: number;

  constructor(
    gl: WebGL2RenderingContext,
    vertexAttribs: A,
    shader: S,
    indices: number[] | null = null,
  ) {
    this.gl = gl;
    this.vertexAttribs = vertexAttribs;
    this.shader = shader;
    this.indices = indices;
    this.count = indices ? indices.length : vertexAttribs["a_position"].data.length / 2;
    this.drawMode = this.gl.TRIANGLES;

    const vertexBuffers = Object.entries(vertexAttribs).map(([key, value]) => {
      return new VertexBuffer(
        this.gl,
        value.data,
        new BufferLayout([new BufferElement(key, value.type)]),
      );
    });
    const indexBuffer = indices ? new IndexBuffer(this.gl, indices) : null;

    this.vertexArray = new VertexArray<S>(this.gl, this.shader, vertexBuffers, indexBuffer);
  }

  setData(name: string, value: number[]) {
    this.vertexAttribs[name] = value;
    this.vertexArray.vertexBuffers[0].setData(value);
  }
}
