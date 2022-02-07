import { IndexBuffer, VertexBuffer } from "./buffer";
import { SHADER_DATA_TYPE_COUNT, SHADER_DATA_TYPE_TO_WEBGL_BASE_TYPE } from "./webgl-constants";
import { Renderer } from "./renderer";

export class VertexArray {
  gl: WebGL2RenderingContext;
  vao: WebGLVertexArrayObject;
  vertexBuffers: VertexBuffer[];
  indexBuffer: IndexBuffer | null;

  private _vertexBufferIndex = 0;

  constructor(vertexBuffers: VertexBuffer[], indexBuffer: IndexBuffer | null = null) {
    this.gl = Renderer.gl;
    this.vertexBuffers = vertexBuffers;
    this.indexBuffer = indexBuffer;

    this.vao = this.gl.createVertexArray() as WebGLVertexArrayObject;
    this.bind();

    vertexBuffers.forEach((vertexBuffer) => {
      vertexBuffer.bind();

      vertexBuffer.layout.elements.forEach((elem) => {
        this.gl.enableVertexAttribArray(this._vertexBufferIndex);
        this.gl.vertexAttribPointer(
          this._vertexBufferIndex,
          SHADER_DATA_TYPE_COUNT[elem.type],
          SHADER_DATA_TYPE_TO_WEBGL_BASE_TYPE[elem.type],
          elem.normalized,
          vertexBuffer.layout.stride,
          elem.offset,
        );

        this._vertexBufferIndex++;
      });
    });

    indexBuffer?.bind();
  }

  bind() {
    this.gl.bindVertexArray(this.vao);
  }

  unbind() {
    this.gl.bindVertexArray(null);
  }
}
