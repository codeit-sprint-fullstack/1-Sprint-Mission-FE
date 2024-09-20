import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ message, onConfirm }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
          <button className={styles.confirmButton} onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

