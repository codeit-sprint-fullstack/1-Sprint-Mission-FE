import styles from "./Modal.module.css";

export default function Modal({ message, onClick }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.error}>{message}</span>
        <button className={styles.button} onClick={onClick}>확인</button>
      </div>
    </div>
  );
}
