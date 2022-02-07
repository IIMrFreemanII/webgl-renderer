import { AllHTMLAttributes } from "react";

import { Nullable } from "frontent/models";

export const addAttributesToNode = (
  node: Nullable<HTMLElement>,
  attributes: AllHTMLAttributes<HTMLElement>,
) => {
  if (!node) return;

  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
};
