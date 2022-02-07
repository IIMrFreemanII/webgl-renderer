#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
layout (location = 0) in vec4 a_position;
layout (location = 1) in vec3 a_normal;
layout (location = 2) in mat4 a_model;

layout (std140) uniform Matrices
{
    mat4 projection;
    mat4 view;
};

// varying to pass the normal to the fragment shader
out vec3 v_normal;

// all shaders have a main function
void main() {

    // gl_Position is a special variable a vertex shader is responsible for setting
    gl_Position = projection * view * a_model * a_position;
    //    gl_Position = u_mvpMatrix * a_position;
    v_normal = mat3(transpose(inverse(a_model))) * a_normal;
}
