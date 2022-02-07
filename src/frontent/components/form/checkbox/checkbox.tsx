import React, { memo } from "react";
import cn from "classnames";

import {
  CheckboxPlacementTypeKeys,
  CheckboxSizeTypeKeys,
  Label,
  MessageField,
} from "frontent/components";
import { RefModel } from "frontent/models";
import { getSVGStatus } from "frontent/utils";
import { checkboxPlacementType, checkboxSizeType } from "./checkbox.constants";

import globalStyles from "frontent/assets/styles/global.module.css";
import styles from "./checkbox.module.css";
import { ReactComponent as CheckMarkSVG } from "frontent/assets/images/checkmark-grey.svg";

export interface CheckboxProps extends Omit<React.HTMLProps<HTMLInputElement>, "onChange" | "ref"> {
  value: string | number;
  checked: boolean;
  onChange: (value: string, isChecked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  label?: string;
  error?: string;
  placement?: CheckboxPlacementTypeKeys;
  inputSize?: CheckboxSizeTypeKeys;
  disabled?: boolean;
  disableOverflow?: boolean;
  showBox?: boolean;
  disableError?: boolean;
  forwardRef?: RefModel<HTMLInputElement>;
}

export const Checkbox: React.FC<CheckboxProps> = memo(
  ({
    value,
    checked = false,
    onChange,
    className = "",
    name,
    label = "",
    error = "",
    placement = "right",
    inputSize = "medium",
    disabled = false,
    disableOverflow = false,
    showBox = true,
    disableError = false,
    forwardRef,
    ...rest
  }: CheckboxProps) => {
    const isChecked = checked && !!value;
    const isDisabled = !value || disabled;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const valueToSet = isChecked ? "" : event.target.value;
      onChange(valueToSet, !!valueToSet, event);
    };

    const sizeStyle = checkboxSizeType[inputSize];
    const checkedStyle = cn({ [styles.checked]: isChecked });

    const containerStyles = cn(styles.container, className);

    const inputWrapperStyles = cn(styles.inputWrapper, checkboxPlacementType[placement]);
    const inputStyles = cn(styles.input, globalStyles.maskElement);

    const checkboxWrapperStyles = cn(styles.checkboxWrap, sizeStyle, checkedStyle);
    const checkboxImageWrapperStyles = cn(styles.checkboxImageWrapper, sizeStyle, checkedStyle);
    const checkboxImageStyles = cn(styles.checkboxImage, sizeStyle, getSVGStatus("white"));

    const labelStyles = cn(styles.label, checkedStyle, {
      [globalStyles.applySingleOverflow]: !disableOverflow,
    });

    return (
      <div className={containerStyles}>
        <div className={inputWrapperStyles}>
          <input
            {...rest}
            className={inputStyles}
            name={name}
            value={value}
            checked={isChecked}
            ref={forwardRef}
            onChange={handleChange}
            disabled={isDisabled}
            type="checkbox"
            role="checkbox"
            aria-label="checkbox"
            aria-disabled={isDisabled}
            aria-checked={isChecked}
            aria-labelledby={name}
          />
          {showBox && (
            <div className={checkboxWrapperStyles}>
              <div className={checkboxImageWrapperStyles}>
                {isChecked && <CheckMarkSVG className={checkboxImageStyles} />}
              </div>
            </div>
          )}
          <Label className={labelStyles} text={label} name={name} size={inputSize} />
        </div>
        <MessageField message={error} size={inputSize} hideMessage={disableError} />
      </div>
    );
  },
);

export default Checkbox;
