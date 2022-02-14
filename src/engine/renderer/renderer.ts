import { glMatrix, mat3, vec2 } from "gl-matrix";
import { Shader, UniformsData } from "./shader";

import { vertex, fragment } from "assets/shaders/default-2d.shader";
import { Mesh } from "./mesh";
import { UniformBuffer } from "./buffer";
import { Rect, RectProps } from "./rect";
import { Texture } from "./texture";
import { Material } from "./material";
import { pointIntersectsAABB } from "../../math/point-in-rect";

export const getQuadVertices = (w: number, h: number, x = 0, y = 0) => {
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

  selectedRect: Rect | null = null;
  hoveredRect: Rect | null = null;

  rects: Rect[] = [];
  textures: Texture[] = [];
  materials: Material[] = [];
  shaders: Shader[] = [];

  constructor() {
    this.canvas.addEventListener("mousemove", (e) => {
      const boundingRect = this.canvas.getBoundingClientRect();
      const mousePos = vec2.fromValues(e.x - boundingRect.x, e.y - boundingRect.y);
      this.hoveredRect = this.findRectBy(mousePos);
    });

    this.canvas.addEventListener("click", (e) => {
      const boundingRect = this.canvas.getBoundingClientRect();
      const mousePos = vec2.fromValues(e.x - boundingRect.x, e.y - boundingRect.y);
      this.selectedRect = this.findRectBy(mousePos);
    });
  }

  findRectBy(mousePosition: vec2): Rect | null {
    for (let i = this.rects.length - 1; i >= 0; i--) {
      const rect = this.rects[i];
      const rotatedMousePos = vec2.rotate(
        vec2.create(),
        mousePosition,
        vec2.fromValues(rect.x, rect.y),
        // inverse of rotation (rotate in opposite direction)
        glMatrix.toRadian(-rect.rotation),
      );
      const aabb = {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };

      const isMouseOver = pointIntersectsAABB(rotatedMousePos, aabb);

      if (isMouseOver) {
        return rect;
      }
    }

    return null;
  }

  setSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);

    mat3.projection(projection, width, height);
  }

  getSize(): vec2 {
    return vec2.fromValues(this.canvas.width, this.canvas.height);
  }

  createMaterial(shader: Shader) {
    const material = new Material(shader);
    this.materials.push(material);
    return material;
  }

  createShader(name: string, vertSrc: string, fragSrc: string) {
    const shader = new Shader(this.gl, name, vertSrc, fragSrc);
    this.shaders.push(shader);
    return shader;
  }

  createTexture(src?: string): Texture {
    const texture = new Texture(this.gl, src);
    this.textures.push(texture);
    return texture;
  }

  createRect(props: RectProps): Rect {
    const rect = new Rect(props);
    this.rects.push(rect);
    return rect;
  }

  drawRects() {
    this.rects.forEach((rect) => {
      mainRenderer.drawMesh(rect.mesh, rect.material, rect.model, cameraView, {
        u_texture0: rect.bgImage.id,
        u_bgColor: rect.bgColor,
      });
    });
  }

  drawMesh(
    mesh: Mesh,
    material: Material,
    model: mat3,
    view: mat3 = cameraView,
    uniformsData?: UniformsData,
  ) {
    material.uniforms.u_model = model;
    material.uniforms.u_view = view;
    material.uniforms.u_projection = projection;

    material.shader.bind();
    material.shader.setUniforms({ ...material.uniforms, ...uniformsData });

    mesh.vertexArray.bind();

    this.drawArrays(mesh);
  }

  begin2D() {
    this.clear2D();
    this.gl.enable(this.gl.CULL_FACE);
  }

  render2D() {
    this.begin2D();
    this.drawRects();
    this.end2D();
  }

  end2D() {}

  start() {
    const quads = [
      {
        mesh: rectMesh,
        x: 100,
        y: 200,
      },
      {
        mesh: rectMesh,
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
    //   new Float32Array(getQuadVertices(100, 100)),
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
        // quad.mesh.setData("a_position", getQuadVertices(100 + size[0], 100 + size[1]));
        const model = mat3.create();
        mat3.translate(model, model, vec2.fromValues(quad.x, quad.y));
        mat3.scale(model, model, size);

        const view = mat3.create();
        mat3.translate(view, view, cameraPosition);
        mat3.invert(view, view);

        const projection = mat3.create();
        mat3.projection(projection, this.canvas.width, this.canvas.height);

        // quad.mesh.shader.bind();
        // quad.mesh.shader.uniforms.u_projection.value = projection;
        // quad.mesh.shader.uniforms.u_view.value = view;
        // quad.mesh.shader.uniforms.u_model.value = model;
        // quad.mesh.shader.setUniforms();

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

const cameraPosition = vec2.fromValues(0, 0);
export const cameraView = mat3.create();
mat3.translate(cameraView, cameraView, cameraPosition);
mat3.invert(cameraView, cameraView);

export const projection = mat3.create();
mat3.projection(projection, mainRenderer.canvas.width, mainRenderer.canvas.height);

export const defaultTexture = mainRenderer.createTexture();

export const defaultShader2D = mainRenderer.createShader("default2D", vertex, fragment);
export const defaultMaterial2D = mainRenderer.createMaterial(defaultShader2D);

export const rectMesh = new Mesh(mainRenderer.gl, {
  a_position: { data: getQuadVertices(1, 1), type: "vec2" },
  a_texcoord: {
    data: getQuadVertices(1, 1),
    type: "vec2",
  },
});
