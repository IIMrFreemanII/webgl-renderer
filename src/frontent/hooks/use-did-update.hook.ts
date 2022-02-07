import { useEffect, useRef, DependencyList } from "react";

export const useDidUpdate = (
  f: (isMountCall: boolean) => void,
  dependencies: any[] | DependencyList,
  callOnMount = false,
) => {
  const isMounted = useRef(false);
  const didMountRef = useRef(callOnMount);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    return f(!isMounted.current);
  }, dependencies);

  useEffect(() => {
    isMounted.current = true;
  }, []);
};

export default useDidUpdate;
