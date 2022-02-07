import { Nullable } from "frontent/models";
import { addLineNumbersWithError, getWebglShaderType, WebglShadersType } from "frontent/utils";

/**
 * Loads a shader.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {string} shaderSource The shader source.
 * @param {WebglShadersType} shaderType The type of shader.
 * @param {(error: string) => void} opt_errorCallback callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {Nullable<WebGLShader>} The created shader.
 */
export const createShader = (
  gl: WebGL2RenderingContext,
  shaderSource: string,
  shaderType: WebglShadersType,
  opt_errorCallback?: (error: string) => void,
): Nullable<WebGLShader> => {
  const errFn = opt_errorCallback || console.error;

  // Create the shader object
  const shader = gl.createShader(getWebglShaderType(gl, shaderType));

  // Something went wrong during shader creation.
  if (!shader) {
    errFn("Error while creating shader");
    return null;
  }

  // Load the shader source
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check the compile status
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    // Something went wrong during compilation; get the error
    const lastError = gl.getShaderInfoLog(shader) || "";

    errFn(
      `Error compiling shader: ${lastError}\n${addLineNumbersWithError(shaderSource, lastError)}`,
    );

    gl.deleteShader(shader);

    return null;
  }

  return shader;
};
