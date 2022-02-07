export const vertex = `#version 300 es
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
}`;
export const fragment = `#version 300 es
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

// Passed in and varied from the vertex shader.
in vec3 v_normal;

layout (std140) uniform Lights
{
    vec3 reverseLightDirection;
};

uniform vec4 color;

void main() {
    // because v_normal is a varying it's interpolated
    // so it will not be a unit vector. Normalizing it
    // will make it a unit vector again
    vec3 normal = normalize(v_normal);

    // compute the light by taking the dot product
    // of the normal to the light's reverse direction
    float light = dot(normal, reverseLightDirection);

    outColor = color;

    // Just set the output to a constant reddish-purple
    // Lets multiply just the color portion (not the alpha)
    // by the light
    outColor.rgb *= light;
}`;
