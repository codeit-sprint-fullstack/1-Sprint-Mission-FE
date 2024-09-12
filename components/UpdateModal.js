import { useState, useEffect, useRef } from 'react';
import Input from './Input';
import Textarea from './Textarea';
import Button from './Button';
import styles from './UpdateModal.module.css';

export default function UpdateModal({ title = '', content = '', onClose, onSave, isPost = true }) {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);
  const dialogRef = useRef(null); // <dialog> 태그의 ref 생성

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal(); // 모달을 자동으로 보여주기
    }
  }, []);

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  // 내용 변경 핸들러
  const handleContentChange = (e) => {
    setUpdatedContent(e.target.value);
  };

  const handleSave = () => {
    onSave({ title: updatedTitle, content: updatedContent }); // 수정된 제목과 내용을 부모로 전달
    onClose(); // 모달 닫기
  };

  const isPostValid = updatedTitle.trim() !== '' && updatedContent.trim() !== '';
  const isCommentValid = updatedContent.trim() !== '';

  return (
    <dialog ref={dialogRef} className={styles.updateModal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>수정하기</h2>
        {isPost && ( // isPost가 true일 경우만 제목 수정 가능
          <Input
            type="text"
            value={updatedTitle}
            onChange={handleTitleChange}
            placeholder="제목을 입력하세요"
            className={styles.updateModalInput}
          />
        )}
        <Textarea
          value={updatedContent}
          onChange={handleContentChange}
          placeholder="내용을 입력하세요"
          className={styles.updateModalTextarea}
        />
        <div className={styles.buttonGroup}>
          <Button name="취소" onClick={onClose} />
          <Button
            name="수정"
            onClick={handleSave}
            disabled={isPost ? !isPostValid : !isCommentValid}
          />
        </div>
      </div>
    </dialog>
  );
}
