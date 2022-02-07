import { ThemeType } from "frontent/components";

export const lightTheme: ThemeType<"Light"> = {
  name: "Light",
  importCallback: () => require("frontent/assets/styles/themes/light-theme.css"),
  className: "lightTheme",
} as const;

export const darkTheme: ThemeType<"Dark"> = {
  name: "Dark",
  importCallback: () => require("frontent/assets/styles/themes/dark-theme.css"),
  className: "darkTheme",
} as const;

export type SupportedThemes = typeof lightTheme | typeof darkTheme;
