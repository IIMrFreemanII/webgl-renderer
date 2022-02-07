import { IndexBuffer, VertexBuffer } from "./buffer";
import { SHADER_DATA_TYPE_COUNT, SHADER_DATA_TYPE_TO_WEBGL_BASE_TYPE } from "./webgl-constants";
import { Shader } from "./shader";

export class VertexArray<T extends Shader<any>> {
  gl: WebGL2RenderingContext;
  vao: WebGLVertexArrayObject;
  vertexBuffers: VertexBuffer[];
  indexBuffer: IndexBuffer | null;

  private _vertexBufferIndex = 0;
  private readonly shader: T;

  constructor(
    gl: WebGL2RenderingContext,
    shader: T,
    vertexBuffers: VertexBuffer[],
    indexBuffer: IndexBuffer | null = null,
  ) {
    this.gl = gl;
    this.shader = shader;
    this.vertexBuffers = vertexBuffers;
    this.indexBuffer = indexBuffer;

    this.vao = this.gl.createVertexArray() as WebGLVertexArrayObject;
    this.bind();

    vertexBuffers.forEach((vertexBuffer) => {
      vertexBuffer.bind();

      vertexBuffer.layout.elements.forEach((elem) => {
        const attribLocation = this.gl.getAttribLocation(this.shader.program, elem.name);
        this.gl.enableVertexAttribArray(attribLocation);
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
