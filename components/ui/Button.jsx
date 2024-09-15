import styles from "./Button.module.scss";

export default function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  type = "button",
}) {
  return (
    <button
      className={styles[`button-${variant}`]}
      onClick={onClick && onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
