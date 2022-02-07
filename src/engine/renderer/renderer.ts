import { glMatrix, mat3, mat4, vec2, vec3 } from "gl-matrix";
import { Shader } from "./shader";

// import vertShader from "assets/shaders/default.vert";
// import vertShader from "assets/shaders/default2D.vert";
// import fragShader from "assets/shaders/default2D.frag";
// import fragShader from "assets/shaders/default.frag";
import { vertex, fragment } from "assets/shaders/default-2d.shader";
import { Mesh } from "./mesh";
import { UniformBuffer } from "./buffer";

const getQuad = (w: number, h: number, x = 0, y = 0) => {
  return [x, y, x, h + y, w + x, h + y, x, y, w + x, h + y, w + x, y];
};

const fromFlatTo2D = (matrix4: number[]) => {
  const arr: number[][] = [];
  arr[0] = matrix4.slice(0, 4);
  arr[1] = matrix4.slice(4, 8);
  arr[2] = matrix4.slice(8, 12);
  arr[3] = matrix4.slice(12, 16);

  return arr;
};

export type UniformBufferObjects = Record<string, UniformBuffer>;

export class Renderer {
  canvas = document.createElement("canvas");
  gl = this.canvas.getContext("webgl2") as WebGL2RenderingContext;
  ubos: UniformBufferObjects;

  setSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  getSize(): vec2 {
    return vec2.fromValues(this.canvas.width, this.canvas.height);
  }

  submit(mesh: Mesh, shader: Shader) {
    mesh.vertexArray.bind();
    shader.bind();
    shader.setUniforms();

    this.drawArrays(mesh);
  }

  begin(perspective: mat4, view: mat4) {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    // Clear the canvas
    this.clear();
    // turn on depth testing
    this.gl.enable(this.gl.DEPTH_TEST);
    // tell webgl to cull faces
    this.gl.enable(this.gl.CULL_FACE);
  }

  end() {}

  start() {
    const shader = new Shader(this.gl, "default2D", vertex, fragment);
    // const quad = new Mesh({
    //   a_position: [0, 0, 30, 0, 0, 150, 0, 150, 30, 0, 30, 150],
    // });
    const quads = [
      {
        mesh: new Mesh(this.gl, { a_position: getQuad(1, 1) }),
        x: 100,
        y: 200,
      },
      {
        mesh: new Mesh(this.gl, { a_position: getQuad(1, 1) }),
        x: 300,
        y: 200,
      },
    ];

    this.gl.enable(this.gl.CULL_FACE);

    const size = vec2.fromValues(1, 1);

    // const vao = this.gl.createVertexArray();
    // this.gl.bindVertexArray(vao);
    //
    // const buffer = this.gl.createBuffer();
    // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    // this.gl.bufferData(
    //   this.gl.ARRAY_BUFFER,
    //   new Float32Array(getQuad(100, 100)),
    //   this.gl.STATIC_DRAW,
    // );
    //
    // this.gl.enableVertexAttribArray(0);
    // const size = 2;
    // const type = this.gl.FLOAT;
    // const normalize = false;
    // const stride = 0;
    // const offset = 0;
    // this.gl.vertexAttribPointer(0, size, type, normalize, stride, offset);

    const cameraPosition = vec2.fromValues(0, 0);

    const animate = (time: number) => {
      this.clear2D();
      vec2.add(size, size, vec2.fromValues(1, 1));

      //

      // grid

      //

      quads.forEach((quad) => {
        // quad.mesh.setData("a_position", getQuad(100 + size[0], 100 + size[1]));
        const model = mat3.create();
        mat3.translate(model, model, vec2.fromValues(quad.x, quad.y));
        mat3.scale(model, model, size);

        const view = mat3.create();
        mat3.translate(view, view, cameraPosition);
        mat3.invert(view, view);

        const projection = mat3.create();
        mat3.projection(projection, this.canvas.width, this.canvas.height);

        shader.bind();
        shader.uniforms.projection.value = projection;
        shader.uniforms.view.value = view;
        shader.uniforms.model.value = model;
        shader.setUniforms();

        quad.mesh.vertexArray.bind();
        this.drawArrays(quad.mesh);
      });

      // vec2.add(cameraPosition, cameraPosition, vec2.fromValues(1, 0));
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  drawArrays(mesh: Mesh) {
    this.gl.drawArrays(mesh.drawMode, 0, mesh.count);
  }

  drawArraysInstanced(mesh: Mesh, instancesCount: number) {
    this.gl.drawArraysInstanced(mesh.drawMode, 0, mesh.count, instancesCount);
  }

  clear() {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  clear2D() {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
}

export const mainRenderer = new Renderer();
