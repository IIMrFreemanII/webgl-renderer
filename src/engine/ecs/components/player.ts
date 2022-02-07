import { Component } from "../component";
import { vec3, vec4 } from "gl-matrix";

export class Player extends Component {
  name = "player";
  health = 100;
  mesh = {};
  mesh1 = null;
  mesh2 = undefined;

  booleanTrue = true;
  booleanFalse = false;

  nums = [1, 2, 3, 4, 5];
  strings = ["item1", "item2", "item3", "1", "23", "4"];
  objects = [{}, null];

  position = vec3.create();
  quaternion = vec4.create();
}
