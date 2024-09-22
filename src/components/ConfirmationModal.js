import React from "react";
import styles from "./ConfirmationModal.module.css"; // 스타일 모듈
import Image from "next/image";

export default function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <Image
        src={"/images/ic_check.png"}
        alt="체크 아이콘"
        width={24}
        height={24}
        className={styles.checkIcon}
      />
      <div className={styles.modalContent}>
        <h3 className={styles.deleteH3}>정말로 상품을 삭제하시겠어요?</h3>
        <div className={styles.buttonContainer}>
          <button onClick={onClose} className={styles.cancelButton}>
            취소
          </button>
          <button onClick={onConfirm} className={styles.confirmButton}>
            네
          </button>
        </div>
      </div>
    </div>
  );
}
