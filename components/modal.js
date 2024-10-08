import { useEffect } from "react";
import styles from "./modal.module.css";
import Image from "next/image";

export function Modal({ isModalOpen, onClose, children }) {
  // 모달이 열리지 않으면 아무것도 렌더링하지 않음
  if (!isModalOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <Image
          src="/deleteImg.svg"
          alt="close"
          width={20}
          height={20}
          className={styles.closeImg}
          onClick={onClose}
        ></Image>
        {children}
      </div>
    </div>
  );
}
