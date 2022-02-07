import React, { memo } from "react";
import cn from "classnames";

import { lerp } from "frontent/utils";
import { GridItemData, GridCalculatedInfo } from "../../grid.types";

import globalStyles from "frontent/assets/styles/global.module.css";
import styles from "./grid-item.module.css";

export interface HeaderProps {
  itemData: GridItemData;
  calculatedInfo: GridCalculatedInfo;
  className?: string;
  children?: React.ReactNode;
}

export const GridItem: React.FC<HeaderProps> = memo(
  ({ itemData, calculatedInfo, className = "", children }: HeaderProps) => {
    const { x, y, w, h } = itemData;
    const { colWidth, colHeight, outerGap, innerGap, cols } = calculatedInfo;

    const gapDiffW = lerp(innerGap, 0, w / cols);
    const gapDiffH = lerp(innerGap, 0, h / cols);

    const width = w * colWidth - gapDiffW;
    const height = h * colHeight - gapDiffH;

    const gapDiffX = lerp(0, innerGap, x / cols);
    const gapDiffY = lerp(0, innerGap, y / cols);

    const dx = x * colWidth + outerGap + gapDiffX;
    const dy = y * colHeight + outerGap + gapDiffY;

    const gridItemInlineStyles: React.CSSProperties = {
      width,
      height,
      transform: `translate(${dx}px, ${dy}px)`,
    };

    const gridItemStyles = cn(styles.gridItem, "dFlex flexDirCol posAbs br1 p1", className);

    const gridItemContentStyles = cn(
      styles.gridItemContent,
      globalStyles.addScrollStyles,
      "dFlex flex11 flexDirCol",
    );

    return (
      <div className={gridItemStyles} style={gridItemInlineStyles}>
        <div className={gridItemContentStyles}>{children}</div>
      </div>
    );
  },
);

export default GridItem;
