import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { updateArticle } from '../../api/api'; // 게시글 수정 API 호출
import styles from './RegisterButton.module.css'; // 동일한 CSS 파일 사용

const EditButton = ({ articleId, title, content }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 게시글 수정 API 호출
      await updateArticle(articleId, { title, content });

      alert('게시글이 수정되었습니다.');
      console.log('수정된 게시글 ID:', articleId);

      // 수정된 게시글 상세 페이지로 이동
      router.replace(`/articles/${articleId}`);
    } catch (error) {
      console.error('게시글 수정 중 오류가 발생했습니다.', error);
      alert('게시글 수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      className={styles.registerButton} // 동일한 CSS 적용
      type="button"
      onClick={handleSubmit}
      disabled={isSubmitting || !title || !content}
    >
      {isSubmitting ? '수정 중...' : '수정'}
    </button>
  );
};

export default EditButton;

