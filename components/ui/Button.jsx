import styles from "./Button.module.scss";

export default function Button({
  children,
  type = "primary",
  disabled = false,
  onClick,
}) {
  return (
    <button
      className={styles[`button-${type}`]}
      onClick={onClick && onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
