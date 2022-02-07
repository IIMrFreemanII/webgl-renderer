import { buttonAppearances } from "./button.constants";

export type ButtonAppearanceKeys = keyof typeof buttonAppearances;

export type ButtonTypeKeys = "button" | "submit" | "reset";
