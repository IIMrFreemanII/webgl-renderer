import React, { memo, useRef } from "react";
import cn from "classnames";

import { SvgIcon } from "frontent/components";
import { useWindowEvent } from "frontent/hooks";
import { isWithinRect, addClassesToNode, removeClassesFromNode } from "frontent/utils";
import { dragZonePosTypes } from "./drag-zone.constants";
import { DragZonePosTypesKeys } from "./drag-zone.types";

import globalStyles from "frontent/assets/styles/global.module.css";
import styles from "./drag-zone.module.css";
import { ReactComponent as DragZoneSVG } from "frontent/assets/images/dots-vertical-grey.svg";

export interface DragZoneProps {
  position: DragZonePosTypesKeys;
  className?: string;
}

export const DragZone: React.FC<DragZoneProps> = memo(
  ({ position, className = "" }: DragZoneProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isWithinRectRef = useRef(false);

    useWindowEvent(
      "mousemove",
      (e) => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        if (!isWithinRect(wrapper, e)) {
          isWithinRectRef.current = false;
          addClassesToNode(wrapper, globalStyles.hideElement);
          return;
        }

        if (isWithinRectRef.current) return;

        isWithinRectRef.current = true;
        removeClassesFromNode(wrapper, globalStyles.hideElement);

        console.log("e");
        console.log(e);
      },
      {
        passive: true,
      },
    );

    const containerStyles = cn(
      styles.container,
      dragZonePosTypes[position],
      globalStyles.hideElement,
      className,
    );

    return (
      <div className={containerStyles} ref={wrapperRef}>
        <SvgIcon className={styles.icon} icon={DragZoneSVG} size="small" />
      </div>
    );
  },
);

export default DragZone;
