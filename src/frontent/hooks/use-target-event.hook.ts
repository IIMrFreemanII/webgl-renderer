import { useCallback, useRef } from "react";

import { useDidUpdate, useDidUnmount } from "frontent/hooks";
import { Nullable } from "frontent/models";
import { isEmpty, isEqual } from "frontent/utils";

type TargetElement = Nullable<HTMLElement>;

type EventHandler<T extends Event = Event> = (e: T) => void;

type OptionsType = boolean | (AddEventListenerOptions & { disable?: boolean });

type TargetEventHook = {
  <K extends keyof HTMLElementEventMap>(
    eventName: K,
    ref: TargetElement,
    handler: EventHandler<HTMLElementEventMap[K]>,
    options?: OptionsType,
  ): void;
};

export const useTargetEvent: TargetEventHook = (eventName, ref, handler, options) => {
  const didUnmount = useRef(false);
  useDidUnmount(() => (didUnmount.current = true));

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const optionsRef = useRef(options);
  if (!isEqual(optionsRef.current, options)) {
    optionsRef.current = options;
  }

  const isClient = typeof window === "object";

  useDidUpdate(
    () => {
      const opts = optionsRef.current;
      const { disable = false, ...rest } = typeof opts === "object" ? opts : {};

      if (!isClient || !ref || disable) return;

      const optionsToSet = typeof opts === "boolean" ? opts : isEmpty(rest) ? false : rest;

      const eventListener: typeof handler = (event) =>
        !didUnmount.current && handlerRef.current && handlerRef.current(event);

      ref.addEventListener(eventName, eventListener, optionsToSet);

      return () => ref.removeEventListener(eventName, eventListener, optionsToSet);
    },
    [eventName, ref, optionsRef.current],
    true,
  );
};

export interface UseTargetListener {
  addTargetListener: TargetEventHook;
}

export const useTargetListener = (): UseTargetListener => {
  const didUnmount = useRef(false);
  useDidUnmount(() => (didUnmount.current = true));

  const eventNameRef = useRef<Nullable<string>>(null);
  const targetRef = useRef<Nullable<TargetElement>>(null);
  const handlerRef = useRef<Nullable<EventHandler<any>>>(null);
  const listenerRef = useRef<Nullable<EventHandler<any>>>(null);
  const optionsRef = useRef<OptionsType>(false);

  const usAssignListener = useCallback(() => {
    if (targetRef.current && eventNameRef.current && listenerRef.current) {
      targetRef.current.removeEventListener(
        eventNameRef.current,
        listenerRef.current,
        optionsRef.current,
      );
    }
    eventNameRef.current = null;
    targetRef.current = null;
    handlerRef.current = null;
    listenerRef.current = null;
    optionsRef.current = false;
  }, []);

  const addTargetListener: TargetEventHook = useCallback((eventName, ref, handler, options) => {
    usAssignListener();

    const { disable = false, ...rest } = typeof options === "object" ? options : {};

    if (!eventName || !ref || !handler || disable) return;

    const optionsToSet = typeof options === "boolean" ? options : isEmpty(rest) ? false : rest;

    const eventListener: typeof handler = (event) =>
      !didUnmount.current && handlerRef.current?.(event);

    eventNameRef.current = eventName;
    targetRef.current = ref;
    handlerRef.current = handler;
    listenerRef.current = eventListener;
    optionsRef.current = optionsToSet;

    ref.addEventListener(eventName, eventListener, optionsToSet);
  }, []);

  useDidUnmount(usAssignListener);

  return { addTargetListener };
};
