import { vec2, vec3, vec4, mat3, mat4 } from "gl-matrix";

export const STATIC_DRAW = 0x88e4;
export const ARRAY_BUFFER = 0x8892;
export const ELEMENT_ARRAY_BUFFER = 0x8893;
export const BUFFER_SIZE = 0x8764;

export const BYTE = 0x1400;
export const UNSIGNED_BYTE = 0x1401;
export const SHORT = 0x1402;
export const UNSIGNED_SHORT = 0x1403;
export const INT = 0x1404;
export const UNSIGNED_INT = 0x1405;
export const FLOAT = 0x1406;
export const BOOL = 0x8b56;

export const SHADER_DATA_TYPE_TO_WEBGL_BASE_TYPE: Record<ShaderDataType, number> = {
  float: FLOAT,
  vec2: FLOAT,
  vec3: FLOAT,
  vec4: FLOAT,
  mat3: FLOAT,
  mat4: FLOAT,
  int: INT,
  sampler2D: INT,
  ivec2: INT,
  ivec3: INT,
  ivec4: INT,
  bool: BOOL,
};

export const SHADER_DATA_TYPE_TO_DEFAULT_VALUE: Record<ShaderDataType, ArrayLike<number> | number> = {
  float: 0,
  vec2: vec2.create(),
  vec3: vec3.create(),
  vec4: vec4.fromValues(0, 0, 0, 1),
  mat3: mat3.create(),
  mat4: mat4.create(),
  int: 0,
  sampler2D: 0,
  ivec2: vec2.create(),
  ivec3: vec3.create(),
  ivec4: vec4.fromValues(0, 0, 0, 1),
  bool: 0, // 0 = false or 1 = true
};

export type ShaderDataType =
  | "float"
  | "vec2"
  | "vec3"
  | "vec4"
  | "mat3"
  | "mat4"
  | "int"
  | "ivec2"
  | "ivec3"
  | "ivec4"
  | "bool"
  | "sampler2D";

export const SHADER_DATA_TYPE_SIZE: Record<ShaderDataType, number> = {
  float: 4,
  vec2: 4 * 2,
  vec3: 4 * 3,
  vec4: 4 * 4,
  mat3: 4 * 3 * 3,
  mat4: 4 * 4 * 4,
  int: 4,
  sampler2D: 4,
  ivec2: 4 * 2,
  ivec3: 4 * 3,
  ivec4: 4 * 4,
  bool: 1,
};

export const SHADER_DATA_TYPE_COUNT = {
  float: 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  mat3: 3 * 3,
  mat4: 4 * 4,
  int: 1,
  ivec2: 2,
  ivec3: 3,
  ivec4: 4,
  bool: 1,
};
