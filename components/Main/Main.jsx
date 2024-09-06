import styles from "./Main.module.scss";

export default function Main({ children, className = "" }) {
  const classNames = `${styles.Main} ${className}`;
  return <main className={classNames}>{children}</main>;
}
