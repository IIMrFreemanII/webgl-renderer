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
  u_projection: {
    type: "mat3";
    value: ArrayLike<number>;
    setter?: (value: ArrayLike<number>) => void;
  };
  u_view: {
    type: "mat3";
    value: ArrayLike<number>;
    setter?: (value: ArrayLike<number>) => void;
  };
  u_model: {
    type: "mat3";
    value: ArrayLike<number>;
    setter?: (value: ArrayLike<number>) => void;
  };
  u_bgColor: {
    type: "vec4";
    value: ArrayLike<number>;
    setter?: (value: ArrayLike<number>) => void;
  };
};

export const vertex = `#version 300 es

layout (location = 0) in vec2 a_position;

uniform mat3 u_projection;
uniform mat3 u_model;
uniform mat3 u_view;

void main() {
    vec3 position = u_projection * u_view * u_model * vec3(a_position, 1);
    gl_Position = vec4(position, 1);
}`;
export const fragment = `#version 300 es

precision highp float;

uniform vec4 u_bgColor;

out vec4 outColor;

void main() {
    outColor = u_bgColor;
}`;
