import React, { memo } from "react";
import cn from "classnames";

import styles from "./header.module.css";

export interface HeaderProps {
  className?: string;
  title?: string;
}

export const Header: React.FC<HeaderProps> = memo(({ className = "", title = "" }: HeaderProps) => {
  return <div className={cn(styles.container, className)}>{title}</div>;
});

export default Header;
