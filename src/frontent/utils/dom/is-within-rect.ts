import { Nullable } from "frontent/models";
import { isWithinRange } from "frontent/utils";

export const isWithinRect = (
  element: Nullable<HTMLElement>,
  event: MouseEvent,
  mousePosition: "client" | "page" = "page",
): boolean => {
  if (!element) return false;

  const { pageX, pageY, clientY, clientX } = event;

  const { offsetWidth, offsetHeight } = element;
  const { top, left } = element.getBoundingClientRect();
  const topOffset = top + offsetHeight;
  const leftOffset = left + offsetWidth;

  const mouseX = mousePosition === "client" ? clientX : pageX;
  const mouseY = mousePosition === "client" ? clientY : pageY;

  return isWithinRange(mouseX, left, leftOffset) && isWithinRange(mouseY, top, topOffset);
};
