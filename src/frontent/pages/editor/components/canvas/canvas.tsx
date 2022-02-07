import { useEffect, useRef, useState } from "react";

import { useDidMount, useResize, useDebounce } from "frontent/hooks";
import { ProfilerUi, PlayButton } from "frontent/components";
import { CANVAS_WRAPPER_ID } from "./canvas.constants";

import styles from "./canvas.module.css";
import { mainRenderer } from "engine/renderer";
import { Rect } from "../../../../../engine/renderer/rect";
import { mat3, vec2 } from "gl-matrix";

const cameraPosition = vec2.fromValues(0, 0);
const view = mat3.create();
mat3.translate(view, view, cameraPosition);
mat3.invert(view, view);

export const Canvas = () => {
  const [rects, setRects] = useState<Rect[]>([
    new Rect(mainRenderer.gl, { width: 100, height: 100 }, { x: 100, y: 100 }),
  ]);
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
    rects.forEach((rect) => {
      const projection = mat3.create();
      mat3.projection(projection, mainRenderer.canvas.width, mainRenderer.canvas.height);

      rect.mesh.shader.uniforms.model.value = rect.model;
      rect.mesh.shader.uniforms.view.value = view;
      rect.mesh.shader.uniforms.projection.value = projection;
      mainRenderer.submitRect(rect);
    });
  }, [rects]);

  return (
    <div id={CANVAS_WRAPPER_ID} className={styles.container} ref={containerRef}>
      <PlayButton />
      <ProfilerUi enable={false} />
    </div>
  );
};
