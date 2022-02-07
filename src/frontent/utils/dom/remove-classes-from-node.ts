import { Nullable } from "frontent/models";

export const removeClassesFromNode = (node: Nullable<HTMLElement>, ...classNames: string[]) => {
  if (!node) return;

  classNames.forEach((name) => node.classList.remove(name));
};
