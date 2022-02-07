const rgbaChannelToHex = (channel: number) => {
  const hex = channel.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

export const rgbaToHex = (r: number, g: number, b: number, a = 255) =>
  "#" + rgbaChannelToHex(r) + rgbaChannelToHex(g) + rgbaChannelToHex(b) + rgbaChannelToHex(a);
