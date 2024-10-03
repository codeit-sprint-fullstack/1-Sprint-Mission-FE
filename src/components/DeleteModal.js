import React from "react";
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.topBox}>
          <div className={styles.iconWrapper}>
            <img src="/image/red.svg" alt="Warning" className={styles.redIcon} />
            <img src="/image/check.svg" alt="Check" className={styles.checkIcon} />
          </div>
          <p className={styles.message}>정말로 상품을 삭제하시겠어요?</p>
        </div>
        <div className={styles.bottomBox}>
          <button className={styles.cancelButton} onClick={onCancel}>
            취소
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

