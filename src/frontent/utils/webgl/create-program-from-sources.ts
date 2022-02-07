import { Nullable } from "frontent/models";
import { createShader, createProgram, WebglShadersType, isNullable } from "frontent/utils";

const defaultShaderType: [WebglShadersType, WebglShadersType] = ["vertex", "fragment"];

/**
 * Creates a program from 2 sources.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {string[]} [opt_attribs] An array of attribs names. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations] The locations for the attribs. A parallel array to opt_attribs letting you assign locations.
 * @param {(error: string) => void} opt_errorCallback callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {Nullable<WebGLShader>} The created shader.
 */
export const createProgramFromSources = (
  gl: WebGL2RenderingContext,
  shaderSources: [string, string],
  opt_attribs?: string[],
  opt_locations?: number[],
  opt_errorCallback?: (error: string) => void,
): Nullable<WebGLProgram> => {
  const errFn = opt_errorCallback || console.error;

  const shaders: Nullable<WebGLShader>[] = [];

  for (let i = 0; i < shaderSources.length; ++i) {
    shaders.push(createShader(gl, shaderSources[i], defaultShaderType[i], opt_errorCallback));
  }

  if (shaders.some(isNullable)) {
    errFn("Some of shaders is absent");
    return null;
  }

  return createProgram(gl, shaders as WebGLShader[], opt_attribs, opt_locations, opt_errorCallback);
};
