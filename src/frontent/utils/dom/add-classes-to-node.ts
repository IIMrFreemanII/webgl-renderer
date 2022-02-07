import { Nullable } from "frontent/models";

export const addClassesToNode = (node: Nullable<HTMLElement>, ...classNames: string[]) => {
  if (!node) return;

  classNames.forEach((name) => node.classList.add(name));
};
