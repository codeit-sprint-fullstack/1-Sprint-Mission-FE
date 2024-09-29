import styles from '@/styles/Modal.module.css';
import checkIcon from '@/public/ic_modal_check.png';
import Image from 'next/image';

export function Modal({ disabled, onClick, label }) {
  //비밀번호가 일치하지 않습니다 -> 로그인 시

  //사용 중인 이메일입니다 -> 회원가입

  //가입 완료되었습니다 -> 회원가입 후 -> 로그인 페이지로 이동

  return <></>;
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
