import { useEffect, useRef, RefObject, RefCallback, useCallback } from "react";

import { useDidUnmount } from "frontent/hooks";
import { ElementRect, initialElementRect, NonNullableKeys, Nullable } from "frontent/models";

type SubscriberResponse = VoidFunction | void;

function useResolvedElement<T extends HTMLElement>(
  subscriber: (element: T) => SubscriberResponse,
  refOrElement?: T | RefObject<T> | null,
): RefCallback<T> {
  let ref: RefObject<T> | null = null;
  const refElement = useRef<T | null>(null);
  const callbackRefElement = useRef<T | null>(null);
  const refCallback = useCallback((element: T) => {
    callbackRefElement.current = element;
    callSubscriber();
  }, []);
  const lastReportedElementRef = useRef<T | null>(null);
  const cleanupRef = useRef<SubscriberResponse | null>();

  const callSubscriber = () => {
    let element: T | null = null;
    if (callbackRefElement.current) {
      element = callbackRefElement.current;
    } else if (refElement.current) {
      element = refElement.current;
    } else if (refOrElement instanceof HTMLElement) {
      element = refOrElement;
    }

    if (lastReportedElementRef.current === element) return;

    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    lastReportedElementRef.current = element;

    if (element) {
      cleanupRef.current = subscriber(element);
    }
  };

  if (refOrElement && !(refOrElement instanceof HTMLElement)) {
    ref = refOrElement;
  }

  useEffect(() => {
    if (ref) {
      refElement.current = ref.current;
    }
    callSubscriber();
  }, [ref, ref?.current, refOrElement]);

  return refCallback;
}

type ResizeHandler<T extends HTMLElement> = (elementRect: ElementRect, element: T) => void;

type HookResponse<T extends HTMLElement> = {
  ref: RefObject<T>;
  refCallback: RefCallback<T>;
  elementRectRef: NonNullableKeys<RefObject<ElementRect>>;
};

export const useResize = <T extends HTMLElement>(
  ref?: Nullable<RefObject<T> | T>,
  onResize?: ResizeHandler<T>,
): HookResponse<T> => {
  const onResizeRef = useRef<ResizeHandler<T> | undefined>(undefined);
  onResizeRef.current = onResize;

  const resizeObserverRef = useRef<ResizeObserver>();

  const elementRef = useRef(ref);

  const elementRectRef = useRef(initialElementRect);

  const didUnmount = useRef(false);
  useDidUnmount(() => (didUnmount.current = true));

  const refCallback = useResolvedElement<T>((element) => {
    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        if (!Array.isArray(entries) || !entries.length || didUnmount.current) return;

        const newSize = element.getBoundingClientRect();

        onResizeRef.current && onResizeRef.current(newSize, element);
        elementRef.current = element;
        elementRectRef.current = newSize;
      });
    }

    resizeObserverRef.current.observe(element);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(element);
      }
    };
  }, ref);

  return { ref: elementRef as any, refCallback, elementRectRef };
};

export default useResize;
