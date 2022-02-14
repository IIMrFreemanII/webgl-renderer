import { vec2 } from "gl-matrix";
import { AABB } from "./rect";

// AABB Collision Detection or "Axis-Aligned Bounding Box" Collision detection
// as it stands for is the simplest form, or one of the simplest forms of
// collision detection that you can implement in a 2D game. If you have an
// object that is axis-aligned, ie. not rotated and doesn't need tight collision
// detection then AABB collision detection is the route you are going to want to take.
export const pointIntersectsAABB = (mousePosition: vec2, box: AABB): boolean => {
  const { x, y, width, height } = box;
  const [mouseX, mouseY] = mousePosition;

  return mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height;
};
