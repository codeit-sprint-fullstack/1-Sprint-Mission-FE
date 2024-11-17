import React from "react";
import styles from "./SmallButton.module.css";

export default function SmallButton({
  href,
  children,
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const combinedClassName = `${styles.button} ${
    disabled ? styles.disabled : ""
  } ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
