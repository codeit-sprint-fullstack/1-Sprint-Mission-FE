import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createArticle } from '../../src/api/api';
import styles from './RegisterButton.module.css';

const RegisterButton = ({ title, content }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newPost = await createArticle({ title, content });

      // 새 게시글을 localStorage에 저장
      localStorage.setItem('newPost', JSON.stringify(newPost));

      // 게시글이 성공적으로 등록되면 상세 페이지로 이동
      router.push(`/articles/${newPost.id}`);
    } catch (error) {
      console.error('게시글 등록 중 오류가 발생했습니다.', error);
      alert('게시글 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      className={styles.registerButton}
      type="button"
      onClick={handleSubmit}
      disabled={isSubmitting || !title || !content}
    >
      {isSubmitting ? '등록 중...' : '등록'}
    </button>
  );
};

export default RegisterButton;

