import styles from "./Msg.module.scss";

export default function Msg({ msg, type = "" }) {
  const category = type === "error" ? "ERROR:" : "";

  return (
    <div className={`${styles.Msg} ${type === "error" ? styles.error : ""}`}>
      <p>
        <span>{category}</span>
        {msg}
      </p>
    </div>
  );
}
