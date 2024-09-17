import styles from "./Button.module.scss";

export default function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      className={`${styles[`button-${variant}`]} ${styles[className]}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
