import { Nullable } from "frontent/models";
import { addLineNumbersWithError } from "frontent/utils";

/**
 * Creates a program, attaches shaders, binds attrib locations, links the program.
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLShader[]} shaders The shaders to attach
 * @param {string[]} [opt_attribs] An array of attribs names. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations] The locations for the attribs. A parallel array to opt_attribs letting you assign locations.
 * @param {(error: string) => void} opt_errorCallback callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {Nullable<WebGLProgram>} The created program.
 */
export const createProgram = (
  gl: WebGL2RenderingContext,
  shaders: WebGLShader[],
  opt_attribs?: string[],
  opt_locations?: number[],
  opt_errorCallback?: (error: string) => void,
): Nullable<WebGLProgram> => {
  const errFn = opt_errorCallback || console.error;

  const program = gl.createProgram();

  // Something went wrong during program creation.
  if (!program) {
    errFn("Error while creating shader");
    return null;
  }

  shaders.forEach((shader) => gl.attachShader(program, shader));

  opt_attribs?.forEach((attrib, i) => {
    gl.bindAttribLocation(program, opt_locations?.[i] || i, attrib);
  });

  gl.linkProgram(program);

  // Check the link status
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (!linked) {
    // something went wrong with the link
    const lastError = gl.getProgramInfoLog(program);
    errFn(
      `Error in program linking: ${lastError}\n${shaders
        .map((shader) => {
          const src = addLineNumbersWithError(gl.getShaderSource(shader) || "");
          const type = gl.getShaderParameter(shader, gl.SHADER_TYPE);
          return `${type}:\n${src}`;
        })
        .join("\n")}`,
    );

    gl.deleteProgram(program);

    return null;
  }

  return program;
};
