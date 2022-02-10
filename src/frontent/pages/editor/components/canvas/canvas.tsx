import { useEffect, useRef, useState } from "react";

import { useDidMount, useResize, useDebounce } from "frontent/hooks";
import { ProfilerUi, PlayButton } from "frontent/components";
import { CANVAS_WRAPPER_ID } from "./canvas.constants";

import styles from "./canvas.module.css";
import { mainRenderer } from "engine/renderer";

const rect1 = mainRenderer.createRect({
  width: 100,
  height: 100,
  x: 0,
  y: 0,
});

const rect2 = mainRenderer.createRect({
  width: 100,
  height: 100,
  x: 300,
  y: 300,
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
    requestAnimationFrame(function render() {
      mainRenderer.renderRects();
      console.log("render");
      // requestAnimationFrame(render);
    });

    // setTimeout(() => {
    //   mainRenderer.renderRects();
    //   console.log("render");
    // }, 0);
  }, []);

  return (
    <div id={CANVAS_WRAPPER_ID} className={styles.container} ref={containerRef}>
      <PlayButton />
      <ProfilerUi enable={false} />
    </div>
  );
};
