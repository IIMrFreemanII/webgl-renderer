export const vertex = `#version 300 es

layout (location = 0) in vec2 a_position;
layout (location = 1) in vec2 a_texcoord;

out vec2 v_texcoord;

uniform mat3 u_projection;
uniform mat3 u_model;
uniform mat3 u_view;

void main() {
    vec3 position = u_projection * u_view * u_model * vec3(a_position, 1);
    
    v_texcoord = a_texcoord;
    gl_Position = vec4(position, 1);
}`;
export const fragment = `#version 300 es

precision highp float;

in vec2 v_texcoord;

uniform vec4 u_bgColor;
uniform sampler2D u_texture0;

out vec4 outColor;

void main() {
    outColor = texture(u_texture0, v_texcoord) * u_bgColor;
}`;
