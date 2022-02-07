export const loadImage = (src: string, crossOrigin = false) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    if (crossOrigin) image.crossOrigin = "*";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
};
