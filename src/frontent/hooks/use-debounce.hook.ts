import { useRef } from "react";

import { useDidUnmount } from "frontent/hooks";
import { Nullable } from "frontent/models";

type Debounce = {
  time: number;
  timer: ReturnType<typeof setTimeout> | null;
};

type DebounceFunction = (callback: Nullable<() => void | Promise<void>>) => void;

type UseDebounceReturnType = {
  debounce: DebounceFunction;
  resetDebounce: VoidFunction;
  active: boolean;
};

export const useDebounce = (delay = 600): UseDebounceReturnType => {
  const debounce = useRef<Debounce>({
    time: delay,
    timer: null,
  });
  debounce.current.time = delay;

  const resetDebounce = () => {
    debounce.current.timer && clearTimeout(debounce.current.timer);
    debounce.current.timer = null;
  };

  const setDebounce: DebounceFunction = (callback) => {
    resetDebounce();

    debounce.current.timer = setTimeout(async () => {
      debounce.current.timer = null;

      await callback?.();
    }, debounce.current.time);
  };

  useDidUnmount(resetDebounce);

  return { debounce: setDebounce, resetDebounce, active: !!debounce.current.timer };
};

export default useDebounce;
