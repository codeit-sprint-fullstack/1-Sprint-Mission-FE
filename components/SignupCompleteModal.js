import React from "react";
import styles from "./SignupCompleteModal.module.css";

const SignupCompleteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.modalText}>가입 완료되었습니다.</p>
        <button className={styles.confirmButton} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default SignupCompleteModal;
