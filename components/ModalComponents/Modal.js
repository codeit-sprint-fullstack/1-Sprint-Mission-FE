import styles from "./Modal.module.css";

export default function Modal({ text, onConfirm }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p className={styles.modalText}>{text}</p>
        <button className={styles.modalBtn} onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
}
