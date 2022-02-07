export interface ShaderData<A extends [], T extends []> {
  vertex: string;
  fragment: string;
  attributes: A;
  uniforms: T;
}
