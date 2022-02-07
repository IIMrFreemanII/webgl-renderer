import React, { memo, useRef, useCallback, useState } from "react";
import cn from "classnames";

import { useDebounce, useWindowSize } from "frontent/hooks";
import { handleSetRef, getNodeRect } from "frontent/utils";
import { Nullable } from "frontent/models";
import { GridItem } from "./components/grid-item";
import { initialGridCols, initialOuterGridGap, initialInnerGridGap } from "./grid.constants";
import { GridData, GridCalculatedInfo, GridItemRenderCallback } from "./grid.types";

import styles from "./grid.module.css";

export interface GridProps {
  data: GridData;
  onItemRender: GridItemRenderCallback;
  className?: string;
  cols?: number;
  outerGap?: number;
  innerGap?: number;
}

export const Grid: React.FC<GridProps> = memo(
  ({
    data,
    onItemRender,
    className = "",
    cols = initialGridCols,
    outerGap = initialOuterGridGap,
    innerGap = initialInnerGridGap,
  }: GridProps) => {
    const { debounce } = useDebounce(100);

    const gridRef = useRef<HTMLDivElement>(null);

    const [calculatedInfo, setCalculatedInfo] = useState<Nullable<GridCalculatedInfo>>(null);

    const handleCalcConstrains = useCallback(
      (ref: HTMLDivElement) => {
        const { width, height } = getNodeRect(ref);

        const colWidth = (width - outerGap * 2) / cols;
        const colHeight = (height - outerGap * 2) / cols;

        setCalculatedInfo({
          colWidth,
          colHeight,
          outerGap,
          innerGap,
          cols,
        });
      },
      [outerGap, innerGap, cols],
    );

    const handleSetDom = useCallback((ref: Nullable<HTMLDivElement>) => {
      if (!ref) return;
      handleSetRef(ref, gridRef);
      handleCalcConstrains(ref);
    }, []);

    useWindowSize(
      () =>
        debounce(() => {
          if (!gridRef.current) return;
          handleCalcConstrains(gridRef.current);
        }),
      "ref",
    );

    const gridStyles = cn(styles.grid, "posRel flex1", className);

    return (
      <div className={gridStyles} ref={handleSetDom}>
        {calculatedInfo &&
          data.map((gridItem, i) => (
            <GridItem key={i} itemData={gridItem} calculatedInfo={calculatedInfo}>
              {onItemRender(i)}
            </GridItem>
          ))}
      </div>
    );
  },
);

export default Grid;
