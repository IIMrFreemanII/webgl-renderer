export type GetNodeRectOutput = {
  top: number; // distance from clientY to top right corner with border;
  bottom: number; // same as "top:" but from client bottom side
  left: number; // distance from clientX to top right corner with border;
  right: number; // same as "left" but from client right side
  x: number; // similar to "top"
  y: number; // similar to "left"
  clientX: number; // distance from clientY to "clientWidth";
  clientY: number; // distance from clientX to "clientHeight";
  contentX: number; // distance from clientY to top "width";
  contentY: number; // distance from clientX to top "height";
  width: number; // content
  clientWidth: number; // content + padding
  offsetWidth: number; // borders + padding + content
  scrollWidth: number; // borders + padding + content + scrollable content if present
  height: number; // content
  clientHeight: number; // content + padding
  offsetHeight: number; // borders + padding + content
  scrollHeight: number; // borders + padding + content + scrollable content if present
};

export const getNodeRect = (node: HTMLElement): GetNodeRectOutput => {
  const { top, bottom, left, right, x, y } = node.getBoundingClientRect();

  const clientWidth = node.clientWidth;
  const offsetWidth = node.offsetWidth;
  const scrollWidth = node.scrollWidth;

  const clientHeight = node.clientHeight;
  const offsetHeight = node.offsetHeight;
  const scrollHeight = node.scrollHeight;

  const computed = getComputedStyle(node);

  const borderLeft = parseFloat(computed.borderLeftWidth);
  const borderTop = parseFloat(computed.borderTopWidth);

  const paddingLeft = parseFloat(computed.paddingLeft);
  const paddingTop = parseFloat(computed.paddingTop);

  const paddingX = paddingLeft + parseFloat(computed.paddingRight);
  const paddingY = paddingTop + parseFloat(computed.paddingBottom);

  const clientX = x + borderLeft;
  const clientY = y + borderTop;

  const contentX = x + borderLeft + paddingLeft;
  const contentY = y + borderTop + paddingTop;

  const width = clientWidth - paddingX;
  const height = clientHeight - paddingY;

  return {
    top,
    bottom,
    left,
    right,
    x,
    y,
    clientX,
    clientY,
    contentX,
    contentY,
    width,
    clientWidth,
    offsetWidth,
    scrollWidth,
    height,
    clientHeight,
    offsetHeight,
    scrollHeight,
  };
};
