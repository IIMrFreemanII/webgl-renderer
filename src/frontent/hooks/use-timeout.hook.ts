import { useRef } from "react";

import { useDidMount, useDidUnmount, useDidUpdate } from "frontent/hooks";
import { Nullable } from "frontent/models";

type TimeoutType = {
  timeout: number;
  timer: Nullable<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>>;
};

type OptionsType = {
  type: "timeout" | "interval";
};

type UseTimeoutType = (
  callback: Nullable<() => void | Promise<void>>,
  timeout: number,
  options?: OptionsType,
) => void;

export const useTimeout: UseTimeoutType = (callback, timeout, options) => {
  const { type = "timeout" } = options || {};

  const componentIsMounted = useRef(true);
  useDidUnmount(() => (componentIsMounted.current = false));

  const timeoutRef = useRef<TimeoutType>({
    timeout,
    timer: null,
  });
  timeoutRef.current.timeout = timeout;

  const resetTimeout = () => {
    const timer = timeoutRef.current.timer;

    const timeoutClearCall = type === "interval" ? clearInterval : clearTimeout;

    timer && timeoutClearCall(timer);
    timeoutRef.current.timer = null;
  };

  useDidMount(() => {
    const timeoutCall = type === "interval" ? setInterval : setTimeout;

    timeoutCall(async () => {
      if (!componentIsMounted.current) return;

      await callback?.();

      if (type === "timeout") {
        timeoutRef.current.timer = null;
      }
    }, timeoutRef.current.timeout);
  });

  useDidUpdate(resetTimeout, [type]);

  useDidUnmount(resetTimeout);
};

export default useTimeout;
