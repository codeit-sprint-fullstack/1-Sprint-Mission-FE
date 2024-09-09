import { useRef, useEffect, useState } from "react";
import styles from "@/styles/alertModal.module.css";
import ReactDOM from "react-dom";
function AlertModal({ message = "", isOpen, onClose }) {
  const dialogRef = useRef(null);

  const handleClose = () => onClose();

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
          <button className={styles.alert_btn} onClick={handleClose}>
            확인
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default AlertModal;
