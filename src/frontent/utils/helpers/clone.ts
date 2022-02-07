export const clone = <T = any>(toClone: T): T => {
  if (!toClone || typeof toClone !== "object") return toClone;
  if (Array.isArray(toClone)) return toClone.slice() as any;
  return { ...toClone };
};
