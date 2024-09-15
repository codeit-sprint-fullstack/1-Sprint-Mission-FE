import styles from "./Loader.module.scss";

export default function Loader({ msg = "로딩중" }) {
  return (
    <div className={styles.Loader}>
      <div className={styles.spinner}></div>
      <p className={styles.msg}>{`${msg}...`}</p>
    </div>
  );
}
