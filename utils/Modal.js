import styles from '@/styles/Modal.module.css';
import checkIcon from '@/public/ic_modal_check.png';
import Image from 'next/image';

export function AuthModal({ errorMsg, setIsShowModal }) {
  const handleClick = () => {
    setIsShowModal(false);
  };
  return (
    <div className={styles.layout}>
      <div className={styles.modal}>
        <div className={styles.modalBackColor}>
          <div className={styles.modalMain}>
            <div className={styles.modalMsg}>{errorMsg}</div>
          </div>
          <button className={styles.modalBtn} onClick={handleClick}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export function ArticleDeleteModal({ onClose, onConfirm }) {
  return (
    <div className={styles.layout}>
      <div className={styles.modal}>
        <div className={styles.modalBackColor}>
          <div className={styles.modalMain}>
            <Image src={checkIcon} alt='체크 이모지' width={24} height={24} />
            <div className={styles.modalMsg}>정말로 삭제하시겠습니까?</div>
          </div>
          <div className={styles.modalBtns}>
            <button className={styles.modalCancelBtn} onClick={onClose}>
              취소
            </button>
            <button className={styles.modalBtn} onClick={onConfirm}>
              네
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
