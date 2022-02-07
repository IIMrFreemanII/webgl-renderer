export const isColor = (color: string) => {
  if (!color) return false;
  const s = new Option().style;
  s.color = color;
  return !!s.color;
};
