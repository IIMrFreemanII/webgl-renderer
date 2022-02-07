#version 300 es

layout (location = 0) in vec2 a_position;

uniform mat3 projection;
uniform mat3 model;
uniform mat3 view;

void main() {
    vec3 position = projection * view * model * vec3(a_position, 1);
    gl_Position = vec4(position, 1);
}
