import styles from "./Modal.module.css";

export default function Modal({ text, onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p className={styles.modalText}>{text}</p>
        <button className={styles.modalBtn} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
}
