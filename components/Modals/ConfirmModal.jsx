import { useRef, useEffect } from "react";
import styles from "@/styles/confirmModal.module.css";
function ConfirmModal({ message = "", isOpen, onClose, onConfirm }) {
  const dialogRef = useRef(null);

  const handleClose = () => onClose();
  const handleConfirm = () => onConfirm();

  useEffect(() => {
    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={styles.alert_modal}>
      <div className={styles.alert_modal_container}>
        <div className={styles.alert_modal_message}>
          <h1>{message}</h1>
        </div>
        <div className={styles.alert_modal_btn_container}>
          <button className={styles.confirm_btn} onClick={handleConfirm}>
            확인
          </button>
          <button className={styles.cancel_btn} onClick={handleClose}>
            취소
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmModal;
