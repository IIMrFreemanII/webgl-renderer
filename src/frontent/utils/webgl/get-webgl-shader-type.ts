export type WebglShadersType = "vertex" | "fragment";

export const getWebglShaderType = (
  gl: WebGL2RenderingContext,
  shaderType: WebglShadersType,
): number => {
  if (shaderType === "vertex") {
    return gl.VERTEX_SHADER;
  } else {
    return gl.FRAGMENT_SHADER;
  }
};
