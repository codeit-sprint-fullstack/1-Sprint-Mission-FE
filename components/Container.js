import styles from "./Container.module.css";

export default function Container({ className = "", children }) {
  const classNames = `${styles.container} ${className}`;
  return <div className={classNames}>{children}</div>;
}
