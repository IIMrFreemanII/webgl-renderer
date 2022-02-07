import { useEffect } from "react";

export const useDidUnmount = (f: VoidFunction) => useEffect(() => f, []);

export default useDidUnmount;
