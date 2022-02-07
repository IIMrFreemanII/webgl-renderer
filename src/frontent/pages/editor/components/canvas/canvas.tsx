import { useRef } from "react";

import { useDidMount, useResize, useDebounce } from "frontent/hooks";
import { ProfilerUi, PlayButton } from "frontent/components";
import { CANVAS_WRAPPER_ID } from "./canvas.constants";

import styles from "./canvas.module.css";
import { Renderer } from "../../../../../engine/renderer";

export const Canvas = () => {
  const { debounce } = useDebounce(50);

  const containerRef = useRef<HTMLDivElement>(null);

  useResize(containerRef, ({ width, height }) => {
    debounce(() => Renderer.setSize(width, height));
  });

  useDidMount(() => {
    const { current } = containerRef;
    if (!current) return;
    const { width, height } = current.getBoundingClientRect();
    Renderer.setSize(width, height);
    current.appendChild(Renderer.canvas);
  });

  return (
    <div id={CANVAS_WRAPPER_ID} className={styles.container} ref={containerRef}>
      <PlayButton />
      <ProfilerUi enable={false} />
    </div>
  );
};
