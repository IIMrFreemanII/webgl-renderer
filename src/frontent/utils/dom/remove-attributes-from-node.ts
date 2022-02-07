import { AllHTMLAttributes } from "react";

import { Nullable } from "frontent/models";

export const removeAttributesFromNode = (
  node: Nullable<HTMLElement>,
  attributes: Array<keyof AllHTMLAttributes<HTMLElement>>,
) => {
  if (!node) return;

  attributes.forEach((key) => node.removeAttribute(key));
};
