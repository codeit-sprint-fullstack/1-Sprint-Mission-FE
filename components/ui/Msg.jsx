import styles from "./Msg.module.scss";

export default function Msg({ msg, type = "" }) {
  const category = type === "error" ? "Error" : "";

  return (
    <div className={`${styles.Msg} ${category}`}>
      <p>
        <span>{category}</span>
        {msg}
      </p>
    </div>
  );
}
