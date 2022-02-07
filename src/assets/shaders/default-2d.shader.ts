export type Default2DAttribs = {
  a_position: {
    data: number[];
    type: "vec2";
  };
  // a_texcoord?: {
  //   data: number[];
  //   type: "vec2";
  // };
};
export type Default2DUniforms = {
  projection: {
    type: "mat3";
    value: ArrayLike<number>;
    setter?: (value: number[]) => void;
  };
  view: {
    type: "mat3";
    value: ArrayLike<number>;
    setter?: (value: number[]) => void;
  };
  model: {
    type: "mat3";
    value: ArrayLike<number>;
    setter?: (value: number[]) => void;
  };
};

export const vertex = `#version 300 es

layout (location = 0) in vec2 a_position;

uniform mat3 projection;
uniform mat3 model;
uniform mat3 view;

void main() {
    vec3 position = projection * view * model * vec3(a_position, 1);
    gl_Position = vec4(position, 1);
}`;
export const fragment = `#version 300 es

precision highp float;

out vec4 outColor;

void main() {
    outColor = vec4(1, 0, 0, 1);
}`;
