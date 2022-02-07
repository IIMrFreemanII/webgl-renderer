import React, { memo } from "react";
import cn from "classnames";

import { StatusColorKeys, getTextStatus } from "frontent/utils";
import { labelSizeType, labelAlignType } from "./label.constants";
import { LabelSizeTypeKeys, LabelAlignTypeKeys } from "./label.types";

import styles from "./label.module.css";

type Props = {
  className?: string;
  name?: string;
  text: string;
  align?: LabelAlignTypeKeys;
  size?: LabelSizeTypeKeys;
  status?: StatusColorKeys;
  isFilled?: boolean;
  isRequired?: boolean;
};

export const Label: React.FC<Props> = memo(
  ({
    className = "",
    name = "",
    text,
    align = "left",
    size = "medium",
    status,
    isFilled = false,
    isRequired = false,
  }: Props) => {
    if (!text) return null;

    const labelStyles = cn(
      styles.label,
      labelSizeType[size],
      labelAlignType[align],
      // TODO: add filled style
      // { [styles.filled]: isFilled },
      getTextStatus(status),
      className,
    );

    return (
      <label id={name} className={labelStyles}>
        {text}
        {isRequired && <span className={getTextStatus(status)}>*</span>}
      </label>
    );
  },
);

export default Label;
