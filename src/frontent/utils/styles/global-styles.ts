import cn from "classnames";

import { capitalize } from "frontent/utils";

import globalStyles from "frontent/assets/styles/global.module.css";

export const statusColorTypes = {
  white: "",
  black: "",
  primary: "",
  success: "",
  warning: "",
  error: "",
};

export type StatusColorKeys = keyof typeof statusColorTypes;

export type SVGStatusType = "smart" | "fill" | "stroke" | "both";

export const getSVGStatus = (status?: StatusColorKeys, type: SVGStatusType = "smart") =>
  cn(globalStyles[status + capitalize(type + "SVG")]);

export const getBackgroundStatus = (status?: StatusColorKeys) =>
  cn(globalStyles[status + "Background"]);

export const getBorderStatus = (status?: StatusColorKeys) => cn(globalStyles[status + "Border"]);

export const getTextStatus = (status?: StatusColorKeys) => cn(globalStyles[status + "Text"]);
