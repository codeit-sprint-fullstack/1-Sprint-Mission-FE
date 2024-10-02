import styles from "./Modal.module.css";

const Modal = ({ message, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <button className={styles.closeButton} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
