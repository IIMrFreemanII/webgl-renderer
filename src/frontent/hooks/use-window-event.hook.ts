import { useRef } from "react";

import { useDidUpdate, useDidUnmount } from "frontent/hooks";
import { isEmpty, isEqual } from "frontent/utils";

type EventHandler<T extends Event = Event> = (e: T) => void;

type WindowEventHook = {
  <K extends keyof WindowEventMap>(
    eventName: K,
    handler: EventHandler<WindowEventMap[K]>,
    options?: boolean | (AddEventListenerOptions & { disable?: boolean }),
  ): void;
};

export const useWindowEvent: WindowEventHook = (eventName, handler, options) => {
  const didUnmount = useRef(false);
  useDidUnmount(() => (didUnmount.current = true));

  const handlerRef = useRef<typeof handler>(handler);
  handlerRef.current = handler;

  const optionsRef = useRef<typeof options>(options);
  if (!isEqual(optionsRef.current, options)) {
    optionsRef.current = options;
  }

  const isClient = typeof window === "object";

  useDidUpdate(
    () => {
      const { disable = false, ...rest } = typeof options === "object" ? options : {};
      if (!isClient || disable) return;

      const optionsToSet = typeof options === "boolean" ? options : isEmpty(rest) ? false : rest;

      const eventListener: typeof handler = (event) =>
        !didUnmount.current && handlerRef.current && handlerRef.current(event);

      window.addEventListener(eventName, eventListener, optionsToSet);

      return () => window.removeEventListener(eventName, eventListener, optionsToSet);
    },
    [eventName, optionsRef.current],
    true,
  );
};

export default useWindowEvent;
