import { Component } from "../component";
import { Mesh } from "../../renderer/mesh";
import { Shader } from "../../renderer";

export class RenderData extends Component {
  shader: Shader;
  mesh: Mesh;
}
