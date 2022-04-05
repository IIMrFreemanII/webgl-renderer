import { Widget } from "./widget";
import { defaultMaterial2D, rectMesh, Renderer } from "../renderer";
import { mat3, vec4 } from "gl-matrix";
import { Mesh } from "../renderer/mesh";
import { Material } from "../renderer/material";

export class Container extends Widget {
  get bgColor(): vec4 {
    return this._bgColor;
  }

  set bgColor(value: vec4) {
    this._bgColor = value;
  }

  private _bgColor: vec4;

  private readonly mesh: Mesh;
  private readonly material: Material;
  private model: mat3 = mat3.create();

  constructor() {
    super();

    this.mesh = rectMesh;
    this.material = defaultMaterial2D;
  }

  build(renderer: Renderer) {}
}
