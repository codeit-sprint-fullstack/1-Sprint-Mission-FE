import React from "react";
import Image from "next/image";
import styles from "./DeleteConfirmModal.module.css";
import checkIcon from "../public/ic_check.png";

const DeleteConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <Image src={checkIcon} alt="확인" width={40} height={40} />
        <p className={styles.modalText}>정말로 상품을 삭제하시겠어요?</p>
        <div className={styles.buttonContainer}>
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

export default DeleteConfirmModal;
