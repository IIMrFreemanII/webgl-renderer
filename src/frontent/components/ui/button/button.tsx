import React, { memo } from "react";
import cn from "classnames";

import { RefModel } from "frontent/models";
import { buttonAppearances } from "./button.constants";
import { ButtonAppearanceKeys, ButtonTypeKeys } from "./button.types";

import styles from "./button.module.css";

export interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, "ref"> {
  children: React.ReactNode;
  className?: string;
  type?: ButtonTypeKeys;
  appearance?: ButtonAppearanceKeys;
  forwardRef?: RefModel<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean;
  imageBtn?: boolean;
}

export const Button: React.FC<ButtonProps> = memo(
  ({
    className,
    type = "button",
    appearance = "primary",
    children,
    forwardRef,
    disabled = false,
    loading = false,
    imageBtn = false,
    onClick,
    ...rest
  }: ButtonProps) => {
    const isDisabled = disabled || loading;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => !isDisabled && onClick?.(e);

    const buttonStyles = cn(
      styles.button,
      { [buttonAppearances[appearance]]: !imageBtn },
      { [styles.imageBtn]: imageBtn },
      { [styles.isDisabled]: isDisabled },
      className,
    );

    return (
      <button
        {...rest}
        className={buttonStyles}
        type={type}
        ref={forwardRef}
        onClick={handleClick}
        disabled={isDisabled}
        aria-label="button"
        aria-disabled={isDisabled}
      >
        {children}
      </button>
    );
  },
);

export default Button;
