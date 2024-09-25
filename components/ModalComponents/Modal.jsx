import styles from "./Modal.module.css";
import { useState, useEffect } from "react";

export default function Modal({ text, onConfirm, onClose }) {
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    // text에 '삭제'라는 단어가 포함되어 있는지 확인
    if (text.includes("삭제")) {
      setIsDelete(true);
    } else {
      setIsDelete(false);
    }
  }, [text]);

  return (
    <div className={styles.modal}>
      {isDelete ? (
        <div className={styles.modalDelContent}>
          <p className={styles.modalText}>{text}</p>
          <div className={styles.buttonGroup}>
            <button className={styles.modalCancelBtn} onClick={onClose}>
              취소
            </button>
            <button className={styles.modalDelBtn} onClick={onConfirm}>
              네
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.modalContent}>
          <p className={styles.modalText}>{text}</p>
          <button className={styles.modalBtn} onClick={onConfirm}>
            확인
          </button>
        </div>
      )}
    </div>
  );
}
