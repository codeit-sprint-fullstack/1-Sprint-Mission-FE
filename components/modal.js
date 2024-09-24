import { useEffect } from "react";
import styles from "./modal.module.css";

export default function Modal({ isOpen, onClose, children }) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // 모달이 열리지 않으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
        {children} {/* 모달의 내용 */}
      </div>
    </div>
  );
}
