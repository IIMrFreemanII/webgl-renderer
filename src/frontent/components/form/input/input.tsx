import React, { memo, useState } from "react";
import cn from "classnames";

import {
  InputLineStatuses,
  Label,
  LabelAlignTypeKeys,
  MessageField,
  MessageFieldAlignTypeKeys,
} from "frontent/components";
import {
  getBackgroundStatus,
  getBorderStatus,
  isFiniteNumber,
  isFinitePositive,
  StatusColorKeys,
} from "frontent/utils";
import { useDidUpdate } from "frontent/hooks";
import { Nullable, RefModel } from "frontent/models";
import { inputSizeType } from "./input.constants";
import { InputSizeTypeKeys, InputTypeKeys, InputDOMElement } from "./input.types";

import globalStyles from "frontent/assets/styles/global.module.css";
import styles from "./input.module.css";

export interface InputProps
  extends Omit<React.HTMLProps<InputDOMElement>, "onChange" | "ref" | "prefix"> {
  value: string | number;
  onChange: (value: string, e: React.ChangeEvent<InputDOMElement>) => void;
  className?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  prefix?: Nullable<string>;
  suffix?: Nullable<string>;
  childrenPos?: "before-input" | "after-input";
  error?: string;
  maxLength?: number;
  children?: React.ReactNode;
  inputSize?: InputSizeTypeKeys;
  type?: InputTypeKeys;
  labelAlign?: LabelAlignTypeKeys;
  messageAlign?: MessageFieldAlignTypeKeys;
  status?: StatusColorKeys;
  statusLine?: InputLineStatuses;
  disabled?: boolean;
  required?: boolean;
  disableError?: boolean;
  disableTextEdition?: boolean;
  isFilled?: boolean;
  forwardWrapperRef?: RefModel<HTMLDivElement>;
  forwardRef?: RefModel<InputDOMElement>;
  normalize?: (value: string, e: React.ChangeEvent<InputDOMElement>) => string | number;
}

export const Input: React.FC<InputProps> = memo(
  ({
    value = "",
    onChange,
    className = "",
    inputWrapperClassName = "",
    inputClassName = "",
    name = "",
    label = "",
    placeholder = "",
    prefix = "",
    suffix = "",
    childrenPos = "after-input",
    error = "",
    maxLength = 1000,
    children,
    inputSize = "medium",
    type = "text",
    labelAlign = "left",
    messageAlign = "left",
    status,
    statusLine,
    disableTextEdition = false,
    disabled = false,
    required = false,
    disableError = false,
    isFilled, // undefined by default intentionally
    forwardWrapperRef,
    forwardRef,
    normalize,
    onKeyDown,
    onFocus,
    ...rest
  }: InputProps) => {
    const isDisabled = disabled;

    maxLength = isFinitePositive(maxLength) ? maxLength : 0;

    const inputValue = value ?? "";
    let customizedValue = inputValue;
    if (prefix && value) customizedValue = prefix + " " + customizedValue;
    if (suffix && value) customizedValue = customizedValue + " " + suffix;

    const [inputType, setInputType] = useState(type);
    useDidUpdate(() => setInputType(type), [type]);

    const handleChange = (e: React.ChangeEvent<InputDOMElement>) => {
      let value: any = e.target.value;

      if (suffix) value = value.replace(` ${suffix}`, "");
      if (prefix) value = value.replace(`${prefix} `, "");
      if (maxLength) value = value.slice(0, maxLength);
      if (normalize) value = normalize(value, e);

      if (value === inputValue) return;
      onChange?.(value, e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<InputDOMElement>) => {
      if (disableTextEdition) return e.preventDefault();
      onKeyDown?.(e);
    };

    const handleFocus = (e: React.FocusEvent<InputDOMElement>) => {
      if (disableTextEdition) return e.preventDefault();
      onFocus?.(e);
    };

    // const handleToggleType = () =>
    //   setInputType((prevState) => (prevState === "text" ? "password" : "text"));

    const inputStatus = error ? "error" : status;

    const hasStatusLine = !!statusLine;

    const hasValue =
      isFilled === undefined ? !!value || isFiniteNumber(parseFloat(value as string)) : isFilled;

    const isTextarea = inputType === "textarea";

    const InputTag = isTextarea ? "textarea" : "input";

    const containerStyles = cn(styles.container, className);

    const inputWrapperStyles = cn(
      styles.inputWrapper,
      inputSizeType[inputSize],
      { [styles.textarea]: isTextarea },
      // TODO: add filled style
      // { [styles.filled]: hasValue },
      { [styles.hasStatusLine]: hasStatusLine },
      { [styles.disabled]: isDisabled },
      getBorderStatus(inputStatus),
      inputWrapperClassName,
    );

    const inputStyles = cn(
      styles.input,
      { [styles.isNotTextEditable]: disableTextEdition },
      { [globalStyles.addScrollStyles]: isTextarea },
      inputClassName,
    );

    return (
      <div className={containerStyles}>
        <Label
          text={label}
          name={name}
          size={inputSize}
          align={labelAlign}
          status={inputStatus}
          isFilled={hasValue}
          isRequired={required}
        />
        <div className={inputWrapperStyles} ref={forwardWrapperRef}>
          {hasStatusLine && (
            <div className={cn(styles.statusLine, getBackgroundStatus(statusLine))} />
          )}
          {childrenPos === "before-input" && children}
          <InputTag
            {...rest}
            className={inputStyles}
            type={inputType}
            value={customizedValue}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            ref={forwardRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            maxLength={maxLength || undefined}
            tabIndex={disableTextEdition ? -1 : rest.tabIndex}
            role="textbox"
            aria-label="textbox"
            autoComplete="off"
            readOnly={disableTextEdition}
            aria-autocomplete="none"
            aria-labelledby={name}
            aria-placeholder={placeholder}
            aria-required={required}
            aria-invalid={!!error}
            aria-disabled={disabled}
            aria-readonly={disableTextEdition}
          />
          {childrenPos === "after-input" && children}
        </div>
        <MessageField
          message={error}
          size={inputSize}
          align={messageAlign}
          hideMessage={disableError}
        />
      </div>
    );
  },
);

export default Input;
