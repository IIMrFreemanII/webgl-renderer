import React, { memo } from "react";
import cn from "classnames";

import { RefModel, OmitUnion, ObjectType } from "frontent/models";
import { isNumber, isNullable, isColor, SVGStatusType } from "frontent/utils";
import { svgIconSizeType } from "./svg-icon.constants";
import { SVGIconSizeTypeKeys } from "./svg-icon.types";

import styles from "./svg-icon.module.css";

export interface SvgIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "ref" | "width" | "height"> {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
  color?: string;
  statusType?: OmitUnion<SVGStatusType, "smart">;
  size?:
    | SVGIconSizeTypeKeys
    | number
    | { width: number; height: number }
    | [width: number, height: number];
  forwardRef?: RefModel<SVGSVGElement>;
}

export const SvgIcon: React.FC<SvgIconProps> = memo(
  ({
    icon,
    className = "",
    color = "",
    statusType = "fill",
    size = "medium",
    forwardRef,
    ...rest
  }: SvgIconProps) => {
    const IconComponent = icon;

    if (isColor(color)) {
      const stylesToAdd: ObjectType = {};

      if (statusType === "both") {
        stylesToAdd["fill"] = color;
        stylesToAdd["stroke"] = color;
      } else {
        stylesToAdd[statusType] = color;
      }

      rest = Object.assign(rest, stylesToAdd);
    }

    if (typeof size !== "string" && !isNullable(size)) {
      let sizeToSet;

      if (isNumber(size)) {
        sizeToSet = { width: size, height: size };
      } else if (Array.isArray(size)) {
        sizeToSet = { width: size[0], height: size[1] };
      } else {
        sizeToSet = size;
      }

      rest = Object.assign(rest, sizeToSet);
    }

    const sizeStyle = cn({
      [svgIconSizeType[size as SVGIconSizeTypeKeys]]: typeof size === "string",
    });

    const iconStyles = cn(styles.icon, sizeStyle, className);

    return <IconComponent {...rest} className={iconStyles} ref={forwardRef} />;
  },
);

export default SvgIcon;
