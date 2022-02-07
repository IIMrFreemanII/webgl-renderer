import React from "react";

export type ElementRect = Omit<DOMRect, "toJSON">;

export const initialElementRect: ElementRect = {
  width: 0,
  height: 0,
  y: 0,
  x: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};
