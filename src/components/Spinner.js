import styles from "./Spinner.module.css";

const Spinner = () => (
  <div className={styles.spinnerWrapper}>
    <div className={styles.spinner}></div>
    <div className={styles.spinnerText}>로딩중...</div>
  </div>
);

export default Spinner;
