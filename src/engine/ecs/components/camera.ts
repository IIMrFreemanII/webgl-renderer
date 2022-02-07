import { Component } from "../component";

export class Camera extends Component {
  fow = 75;
  aspect = 800 / 600;
  near = 0.1;
  far = 1000;
}
