import React, { memo } from "react";
import cn from "classnames";

import { StatusColorKeys, getTextStatus } from "frontent/utils";
import { Nullable } from "frontent/models";
import { messageFieldSizeType, messageFieldAlignType } from "./message-field.constants";
import { MessageFieldSizeTypeKeys, MessageFieldAlignTypeKeys } from "./message-field.types";

import globalStyles from "frontent/assets/styles/global.module.css";
import styles from "./message-field.module.css";

export interface MessageFieldProps {
  message: Nullable<string>;
  className?: string;
  status?: StatusColorKeys;
  align?: MessageFieldAlignTypeKeys;
  size?: MessageFieldSizeTypeKeys;
  hideMessage?: boolean;
}

export const MessageField: React.FC<MessageFieldProps> = memo(
  ({
    message,
    className = "",
    status = "error",
    align = "left",
    size = "medium",
    hideMessage,
  }: MessageFieldProps) => {
    if (hideMessage) return null;

    const containerStyles = cn(
      styles.container,
      messageFieldSizeType[size],
      messageFieldAlignType[align],
      className,
    );

    const messageStyles = cn(globalStyles.applyMultiOverflow, getTextStatus(status));

    return (
      <div className={containerStyles}>
        <span className={messageStyles}>{message}</span>
      </div>
    );
  },
);

export default MessageField;
