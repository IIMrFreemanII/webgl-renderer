import { CSSProperties } from "react";

import { Nullable } from "frontent/models";

export const applyCSSToNode = (node: Nullable<HTMLElement>, stylesToApply: CSSProperties) => {
  if (!node) return;

  Object.entries(stylesToApply).forEach(([key, value]) => {
    node.style[key] = value;
  });
};
