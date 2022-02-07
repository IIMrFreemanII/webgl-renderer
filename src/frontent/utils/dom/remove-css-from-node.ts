import { CSSProperties } from "react";

import { Nullable } from "frontent/models";

export const removeCSSFromNode = (
  node: Nullable<HTMLElement>,
  ...stylesToRemove: Array<keyof CSSProperties>
) => {
  if (!node) return;

  stylesToRemove.forEach((key) => {
    node.style[key] = null;
  });
};
