import styles from "./Button.module.scss";

export default function Button({
  children,
  type = "primary",
  disabled = false,
}) {
  return (
    <button className={styles[`button-${type}`]} disabled={disabled}>
      {children}
    </button>
  );
}
