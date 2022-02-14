export class Texture {
  public image: HTMLImageElement;
  public id: WebGLTexture;
  private readonly gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext, src?: string) {
    this.gl = gl;
    this.id = gl.createTexture() as WebGLTexture;
    this.bind();

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([255, 255, 255, 255]),
    );

    this.unbind();

    if (src) {
      this.image = new Image();
      this.image.src = src;
      this.image.onload = () => {
        this.bind();

        this.gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
        this.gl.generateMipmap(gl.TEXTURE_2D);

        this.unbind();
      };
    }
  }

  bind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.id);
  }

  unbind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }
}
