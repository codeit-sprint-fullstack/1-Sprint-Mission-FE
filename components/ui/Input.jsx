import React from "react";
import styles from "./Input.module.css";

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input className={`${styles.input} ${className}`} ref={ref} {...props} />
  );
});

Input.displayName = "Input";

export const Select = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <select className={`${styles.select} ${className}`} ref={ref} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";
