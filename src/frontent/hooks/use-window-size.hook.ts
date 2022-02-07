import { useRef, useState, useCallback, MutableRefObject } from "react";

import { useWindowEvent } from "frontent/hooks";

type OnResizeCallback = (windowSize: WindowSize) => void;

export type WindowSize = { windowWidth: number; windowHeight: number };

export type WindowSizeOutputType = "state" | "ref";

export type UseWindowSizeReturnType<T extends WindowSizeOutputType> = T extends "state"
  ? WindowSize
  : MutableRefObject<WindowSize>;

export const useWindowSize = <T extends WindowSizeOutputType = "state">(
  onResize?: OnResizeCallback,
  outputType?: T,
): UseWindowSizeReturnType<T> => {
  outputType = outputType ?? ("state" as T);

  const isClient = typeof window === "object";

  const getSize = useCallback(
    (): WindowSize => ({
      windowWidth: isClient ? window.innerWidth : 0,
      windowHeight: isClient ? window.innerHeight : 0,
    }),
    [],
  );

  const [windowSize, setWindowSize] = useState(getSize);
  const windowSizeRef = useRef(getSize());

  const handleResize = () => {
    const size = getSize();

    if (outputType === "state") {
      setWindowSize(size);
    } else {
      windowSizeRef.current = size;
    }

    onResize?.(size);
  };

  useWindowEvent("resize", handleResize);

  const output = outputType === "state" ? windowSize : windowSizeRef;

  return output as UseWindowSizeReturnType<T>;
};

export default useWindowSize;
