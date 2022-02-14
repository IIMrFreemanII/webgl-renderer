import { Shader, UniformsData } from "./shader";

export class Material {
  public shader: Shader;
  public uniforms: UniformsData = {};

  constructor(shader: Shader) {
    this.shader = shader;
  }
}
