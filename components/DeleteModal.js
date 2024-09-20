import styles from './DeleteModal.module.css';
import Button from './Button';
import { useRef, useEffect } from 'react';

export default function DeleteModal({ isPost, onClose, onDelete }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal(); // 모달을 자동으로 보여주기
    }
  }, []);

  return (
    <dialog ref={dialogRef} className={styles.deleteModal}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>
          {isPost ? '게시글을 삭제하시겠습니까?' : '댓글을 삭제하시겠습니까?'}
        </h2>
        <div className={styles.buttonGroup}>
          <Button name="취소" onClick={onClose} /> {/* 모달 닫기 */}
          <Button name="삭제" onClick={onDelete} /> {/* 삭제 확정 */}
        </div>
      </div>
    </dialog>
  );
}
