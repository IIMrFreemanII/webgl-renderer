import { useEffect, useRef } from "react";

import { useDidMount, useResize, useDebounce } from "frontent/hooks";
import { ProfilerUi, PlayButton } from "frontent/components";
import { CANVAS_WRAPPER_ID } from "./canvas.constants";
import image1 from "images/f-texture.png";
import image2 from "images/image2.jpeg";

import styles from "./canvas.module.css";
import { fromFlatTo2D, mainRenderer } from "engine/renderer";
import { mat4, vec3, vec4 } from "gl-matrix";

const texture1 = mainRenderer.createTexture(image1);
const texture2 = mainRenderer.createTexture(image2);

const rect1 = mainRenderer.createRect({
  width: 100,
  height: 100,
  bgImage: texture1,
});

const rect2 = mainRenderer.createRect({
  width: 100,
  height: 100,
  bgImage: texture2,
});

export const Canvas = () => {
  const { debounce } = useDebounce(50);

  const containerRef = useRef<HTMLDivElement>(null);

  useResize(containerRef, ({ width, height }) => {
    debounce(() => mainRenderer.setSize(width, height));
  });

  useDidMount(() => {
    const { current } = containerRef;
    if (!current) return;
    const { width, height } = current.getBoundingClientRect();
    mainRenderer.setSize(width, height);
    current.appendChild(mainRenderer.canvas);
  });

  useEffect(() => {
    const matrix = mat4.fromTranslation(mat4.create(), vec3.fromValues(100, 100, 100));
    //console.log(fromFlatTo2D(matrix as number[]));
    setTimeout(() => {
      requestAnimationFrame(function render() {
        mainRenderer.render2D();
        // console.log("render");
        // requestAnimationFrame(render);
      });
    }, 100);
  }, []);

  return (
    <div id={CANVAS_WRAPPER_ID} className={styles.container} ref={containerRef}>
      <PlayButton />
      <ProfilerUi enable={false} />
    </div>
  );
};
