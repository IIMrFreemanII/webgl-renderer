export interface Uniform {
  name: string;
  type: string;
  value: any;
  setter?: (value: any) => void;
}

export interface ShaderData<T extends []> {
  uniforms: T;
}
