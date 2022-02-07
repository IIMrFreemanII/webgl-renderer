import { useCallback, useState } from "react";

export const useRerender = (): VoidFunction => {
  const [, setRerender] = useState(false);
  return useCallback(() => setRerender((prevState) => !prevState), []);
};

export default useRerender;
