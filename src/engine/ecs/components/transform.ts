import { Component } from "../component";
import { mat4, vec3, quat } from "gl-matrix";

export class Transform extends Component {
  position = vec3.create();
  rotation = vec3.create();
  scale = vec3.fromValues(1, 1, 1);
  quaternion = quat.create();

  static maxCount = 5;
  static count = 0;
  static index = 0;
  static floatsPerMatrix = 16;
  static bytesPerFloat = 4;
  static bytesPerMatrix = Transform.floatsPerMatrix * Transform.bytesPerFloat;
  static models = new Float32Array(Transform.maxCount * Transform.floatsPerMatrix);

  modelMatrix: mat4;

  // modelInverseTransposeMatrix = mat4.create();

  constructor() {
    super();

    Transform.count++;
    if (Transform.count === Transform.maxCount) {
      throw new Error("Max transform count exceeded!");
    }

    const byteOffsetToMatrix =
      Transform.index * Transform.floatsPerMatrix * Transform.bytesPerFloat;
    this.modelMatrix = new Float32Array(
      Transform.models.buffer,
      byteOffsetToMatrix,
      Transform.floatsPerMatrix,
    );
    Transform.index++;

    this.updateModelMatrix();
    console.log(Transform.models);
  }

  updateModelMatrix() {
    // model
    quat.fromEuler(this.quaternion, this.rotation[0], this.rotation[1], this.rotation[2]);
    mat4.fromRotationTranslationScale(this.modelMatrix, this.quaternion, this.position, this.scale);
    // model inverse transpose
    // this.modelInverseTransposeMatrix = mat4.create();
    // mat4.invert(this.modelInverseTransposeMatrix, this.modelMatrix);
    // mat4.transpose(this.modelInverseTransposeMatrix, this.modelInverseTransposeMatrix);
  }
}
