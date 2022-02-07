export const capitalize = ([first, ...rest]: string, locale = navigator.language) =>
  first.toLocaleUpperCase(locale) + rest.join("");
