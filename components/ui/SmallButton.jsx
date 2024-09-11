import React from "react";
import styles from "./SmallButton.module.css";

export default function Button({
  onClick,
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button type={type} onClick={onClick} className={styles.button} {...props}>
      {children}
    </button>
  );
}
