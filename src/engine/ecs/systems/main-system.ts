import { System } from "../system";
import { RenderData } from "../components/render-data";
import { Transform } from "../components";
import { Time } from "../../game-loop";
import { Mesh } from "../../renderer/mesh";
import { normals, positions } from "../../renderer/cube-data";
import { Shader } from "../../renderer";
import { vec3, vec4 } from "gl-matrix";

export class MainSystem extends System {
  onCreate() {
    // const shader = new Shader("default", vertShader, fragShader);
    // shader.uniforms.color.value = vec4.fromValues(0.2, 1, 0.2, 1);
    // const mesh = new Mesh({ a_position: positions, a_normal: normals });
    // const width = 20;
    // const height = 20;
    // const depth = 20;
    //
    // for (let x = 0; x < width; x++) {
    //   for (let y = 0; y < height; y++) {
    //     for (let z = 0; z < depth; z++) {
    //       const cube = this.world.createEntity();
    //
    //       const transform = cube.addComponent(Transform);
    //       transform.position = vec3.fromValues(
    //         x * 1.5 - width / 2,
    //         y * 1.5 - height / 2,
    //         z * 1.5 - depth / 2,
    //       );
    //       transform.updateModelMatrix();
    //
    //       const renderData = cube.addComponent(RenderData);
    //       renderData.shader = shader;
    //       renderData.mesh = mesh;
    //     }
    //   }
    // }
  }

  tick() {
    // const arr = this.world.fromAll(Transform);
    // for (let i = 0; i < arr.length; i++) {
    //   const components = arr[i];
    //   const transform = components[0];
    //   const speed = 20;
    //
    //   transform.rotation[0] += Time.delta * speed;
    //   transform.rotation[1] += Time.delta * speed;
    //   transform.rotation[2] += Time.delta * speed;
    //
    //   transform.updateModelMatrix();
    // }
  }
}
