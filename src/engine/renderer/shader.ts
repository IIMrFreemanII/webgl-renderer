import { ShaderDataType } from "./webgl-constants";

export type UniformBlock = { name: string; index: number; target: number };
export type UniformsData<T extends ArrayLike<number> | number = any> = Record<string, T>;
export type UniformInfo = {
  type: string;
  location: WebGLUniformLocation;
  setter: any;
};
export type UniformInfos = Record<string, UniformInfo>;

export class Shader {
  public readonly name: string;
  public uniformBlocks: UniformBlock[];
  public uniformInfos: UniformInfos;

  public readonly program: WebGLProgram;
  private readonly gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext, name: string, vertSrc: string, fragScr: string) {
    this.gl = gl;
    this.name = name;

    // create GLSL shaders, upload the GLSL source, compile the shaders
    const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertSrc);
    const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragScr);

    // Link the two shaders into a program
    this.program = this.createProgram(vertexShader, fragmentShader);
    // this.uniforms = this.extractUniforms(vertSrc, fragScr);
    this.uniformInfos = this.getUniformsInfo(vertSrc, fragScr);
    this.uniformBlocks = this.extractUniformBlocks(vertSrc, fragScr);
  }

  private compileShader(shaderType, shaderSource: string) {
    // Create the shader object
    const shader = this.gl.createShader(shaderType) as WebGLShader;

    // Set the shader source code.
    this.gl.shaderSource(shader, shaderSource);

    // Compile the shader
    this.gl.compileShader(shader);

    // Check if it compiled
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (!success) {
      // Something went wrong during compilation; get the error
      throw "could not compile shader:" + this.gl.getShaderInfoLog(shader);
    }

    return shader;
  }

  private createProgram(vertexShader, fragmentShader) {
    // create a program.
    const program = this.gl.createProgram() as WebGLProgram;

    // attach the shaders.
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);

    // link the program.
    this.gl.linkProgram(program);

    // Check if it linked.
    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (!success) {
      // something went wrong with the link; get the error
      throw "program failed to link:" + this.gl.getProgramInfoLog(program);
    }

    // delete shaders when program is linked
    this.gl.deleteShader(vertexShader);
    this.gl.deleteShader(fragmentShader);

    return program;
  }

  private extractUniformBlocks(vertSrc: string, fragSrc: string) {
    const vertUniformBlocks = vertSrc.match(/layout \(std140\) uniform \w+/g) || [];
    const fragUniformBlocks = fragSrc.match(/layout \(std140\) uniform \w+/g) || [];

    const uniformBlocks = Array.from(new Set([...vertUniformBlocks, ...fragUniformBlocks]));
    return uniformBlocks.map((item, i) => {
      const name = item.split(" ").pop() as string;
      const index = this.gl.getUniformBlockIndex(this.program, name);
      this.gl.uniformBlockBinding(this.program, index, i);

      return {
        name,
        index,
        target: i,
      };
    });
  }

  private getUniformsInfo(vertSrc: string, fragSrc: string) {
    const vertUniforms = vertSrc.match(/uniform \w+ \w+/g) || [];
    const fragUniforms = fragSrc.match(/uniform \w+ \w+/g) || [];

    const uniforms = Array.from(new Set([...vertUniforms, ...fragUniforms]));
    let textureUnit = 0;

    return uniforms.reduce<UniformInfos>((acc, item) => {
      const [_, type, name] = item.split(" ");
      const location = this.getUniformLocation(name) as WebGLUniformLocation;

      let setter;
      if (type === "sampler2D") {
        const unit = textureUnit;
        const callback = typeToSetter[type as ShaderDataType].setter(this.gl, location);

        setter = (value) => {
          callback(unit);
          this.gl.activeTexture(this.gl.TEXTURE0 + unit);
          this.gl.bindTexture(this.gl.TEXTURE_2D, value);
        };

        textureUnit++;
      } else {
        setter = typeToSetter[type as ShaderDataType].setter(this.gl, location);
      }

      const uniformInfo: UniformInfo = {
        type,
        location,
        setter,
      };

      return {
        ...acc,
        [name]: uniformInfo,
      };
    }, {});
  }

  public getUniformLocation(name: string) {
    return this.gl.getUniformLocation(this.program, name);
  }

  public bind() {
    // Tell it to use our program (pair of shaders)
    this.gl.useProgram(this.program);
  }

  public setUniforms(uniforms: UniformsData) {
    Object.keys(uniforms).forEach((key) => {
      this.uniformInfos[key].setter(uniforms[key]);
    });
  }

  public unbind() {
    this.gl.useProgram(null);
  }

  public destroy() {
    this.gl.deleteProgram(this.program);
  }
}

export const typeToSetter: Record<
  ShaderDataType,
  {
    setter: (
      gl: WebGL2RenderingContext,
      location: WebGLUniformLocation | null,
    ) => (value: any) => void;
  }
> = {
  float: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniform1f(location, value),
  },
  vec2: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniform2fv(location, value),
  },
  vec3: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniform3fv(location, value),
  },
  vec4: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniform4fv(location, value),
  },
  mat3: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniformMatrix3fv(location, false, value),
  },
  mat4: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniformMatrix4fv(location, false, value),
  },
  int: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniform1i(location, value),
  },
  bool: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniform1i(location, value),
  },
  sampler2D: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniform1i(location, value),
  },
  ivec2: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniform2iv(location, value),
  },
  ivec3: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniform3iv(location, value),
  },
  ivec4: {
    setter: (gl: WebGL2RenderingContext, location: WebGLUniformLocation | null) => (value: any) =>
      gl.uniform4iv(location, value),
  },
};
