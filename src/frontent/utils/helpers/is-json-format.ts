export const isJSONFormat = (value: any): boolean => {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
};
