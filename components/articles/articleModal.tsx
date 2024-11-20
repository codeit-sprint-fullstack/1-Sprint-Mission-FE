import styles from './articleModal.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { patchArticle } from '../../pages/api/articles';
import { useRouter } from 'next/router';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  id: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, id }) => {
  const [btnState, setBtnState] = useState('commentBtnfalse');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const titleHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    if (title.length > 0 && content.length > 0) {
      setBtnState('addbtn');
    } else {
      setBtnState('addbtnfalse');
    }
  };

  const contentHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (title.length > 0 && content.length > 0) {
      setBtnState('addbtn');
    } else {
      setBtnState('addbtnfalse');
    }
  };

  const patchClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: title,
      content,
    };
    try {
      await patchArticle(id, data);
      closeModal();
    } catch (e) {
      console.log(e);
    }
    // router.reload();
  };
  if (!isOpen) {
    return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.sss}>
          <Image
            onClick={closeModal}
            src="/deleteImg.svg"
            width={24}
            height={24}
            alt="close"
          ></Image>
        </div>
        <div>
          <form onSubmit={patchClick} className={styles.Modalform}>
            <p>게시글 제목</p>
            <textarea
              className={styles.InputTitle}
              placeholder="수정할 제목을 입력해주세요"
              onChange={titleHandle}
            ></textarea>
            <p>게시글 내용</p>
            <textarea
              className={styles.InputContent}
              placeholder="수정할 내용을 입력해주세요"
              onChange={contentHandle}
            ></textarea>
            {btnState === 'addbtn' ? (
              <button className={styles.addbtn}>수정</button>
            ) : (
              <button
                onClick={(e) => e.preventDefault()}
                className={styles.addbtnfalse}
              >
                수정
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
