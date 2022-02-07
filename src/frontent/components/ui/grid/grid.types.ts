import React from "react";

export type GridItemData = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type GridData = GridItemData[];

export type GridCalculatedInfo = {
  colWidth: number;
  colHeight: number;
  outerGap: number;
  innerGap: number;
  cols: number;
};

export type GridItemRenderCallback = (index: number) => React.ReactNode;
