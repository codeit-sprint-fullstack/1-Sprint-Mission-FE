import styles from "./Message.module.scss";

export default function Message({ msg, type = "" }) {
  const category = type === "error" ? "ERROR:" : "";

  return (
    <div
      className={`${styles.Message} ${type === "error" ? styles.error : ""}`}
    >
      <p>
        <span>{category}</span>
        {msg}
      </p>
    </div>
  );
}
