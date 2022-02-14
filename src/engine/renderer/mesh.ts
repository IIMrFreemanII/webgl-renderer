import { BufferElement, BufferLayout, IndexBuffer, VertexBuffer } from "./buffer";
import { VertexArray } from "./vertex-array";
import { SHADER_DATA_TYPE_COUNT } from "./webgl-constants";

export type VertexAttribs = {
  a_position: {
    data: number[];
    type: "vec2";
  };
  a_texcoord: {
    data: number[];
    type: "vec2";
  };
};

export class Mesh {
  gl: WebGL2RenderingContext;
  vertexAttribs: VertexAttribs;
  indices: number[] | null;
  vertexArray: VertexArray;
  count: number;
  drawMode: number;

  constructor(
    gl: WebGL2RenderingContext,
    vertexAttribs: VertexAttribs,
    indices: number[] | null = null,
  ) {
    this.gl = gl;
    this.vertexAttribs = vertexAttribs;
    this.indices = indices;
    this.count = indices
      ? indices.length
      : vertexAttribs.a_position.data.length /
        SHADER_DATA_TYPE_COUNT[vertexAttribs.a_position.type];
    this.drawMode = this.gl.TRIANGLES;

    const vertexBuffers = Object.entries(vertexAttribs).map(([key, value]) => {
      return new VertexBuffer(
        this.gl,
        value.data,
        new BufferLayout([new BufferElement(key, value.type)]),
      );
    });
    const indexBuffer = indices ? new IndexBuffer(this.gl, indices) : null;

    this.vertexArray = new VertexArray(this.gl, vertexBuffers, indexBuffer);
  }

  setData(name: string, value: number[]) {
    this.vertexAttribs[name] = value;
    this.vertexArray.vertexBuffers[0].setData(value);
  }
}
