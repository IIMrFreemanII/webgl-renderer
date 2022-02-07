import { System } from "../system";
import { glMatrix, mat4, vec3 } from "gl-matrix";
import { Transform } from "../components";
import { RenderData } from "../components/render-data";
import { mainRenderer } from "../../renderer";
import { UniformBuffer, UniformBufferElement, UniformBufferLayout } from "../../renderer/buffer";

export class RenderSystem extends System {
  // // light
  // invertLightDir = vec3.fromValues(0.5, 0.7, 1);
  //
  // // camera
  // perspective = mat4.create();
  // near = 0.1;
  // far = 1000;
  // fov = 60;
  //
  // camPos = vec3.fromValues(0, 50, 50);
  // camFront = vec3.fromValues(0, 0, 0);
  // camUp = vec3.fromValues(0, 1, 0);
  // view = mat4.create();

  onCreate() {
    // mainRenderer.start();
    // vec3.normalize(this.invertLightDir, this.invertLightDir);
    // mat4.perspective(
    //   this.perspective,
    //   glMatrix.toRadian(this.fov),
    //   Renderer.canvas.width / Renderer.canvas.height,
    //   this.near,
    //   this.far,
    // );
    // mat4.lookAt(this.view, this.camPos, this.camFront, this.camUp);
    //
    // Renderer.ubos = {
    //   Matrices: new UniformBuffer(
    //     new UniformBufferLayout([
    //       new UniformBufferElement("perspective", "mat4"),
    //       new UniformBufferElement("view", "mat4"),
    //       new UniformBufferElement("reverseLightDirection", "vec3"),
    //     ]),
    //     0,
    //   ),
    //   Lights: new UniformBuffer(
    //     new UniformBufferLayout([new UniformBufferElement("reverseLightDirection", "vec3")]),
    //     1,
    //   ),
    // };
    // Renderer.ubos.Matrices.set("perspective", this.perspective);
    // Renderer.ubos.Matrices.set("view", this.view);
    // Renderer.ubos.Lights.set("reverseLightDirection", this.invertLightDir);
  }

  editorTick() {
    this.render();
  }

  tick() {
    this.render();
  }

  render() {
    // Renderer.begin(this.perspective, this.view);
    //
    // const arr = this.world.fromAll(Transform, RenderData);
    // const components = arr[0];
    // const transform = components[0];
    // const renderData = components[1];
    //
    // Renderer.submitInstanced(renderData.mesh, renderData.shader, arr.length);
    //
    // // for (let i = 0; i < arr.length; i++) {
    // //   const components = arr[i];
    // //   const transform = components[0];
    // //   const renderData = components[1];
    // //   renderData.shader.uniforms.model.value = transform.modelMatrix;
    // //   Renderer.submit(renderData.mesh, renderData.shader);
    // // }
    //
    // Renderer.end();
  }
}
