import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './RegisterButton.module.css';

const RegisterButton = ({ title, content }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Next.js 라우터 사용

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 게시글 생성 API 호출
      const response = await fetch('https://one-sprint-mission-be-rzbk.onrender.com/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('게시글 등록에 실패했습니다.');
      }

      const newPost = await response.json();

      // 게시글이 성공적으로 등록되면 상세 페이지로 이동
      router.push(`/articles/${newPost.id}`);
    } catch (error) {
      console.error(error);
      alert('게시글 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      className={styles.registerButton}
      type="button" // API 요청을 위한 버튼 클릭
      onClick={handleSubmit} // 등록 처리
      disabled={isSubmitting || !title || !content} // 제출 중이거나 제목/내용이 없으면 비활성화
    >
      {isSubmitting ? '등록 중...' : '등록'}
    </button>
  );
};

export default RegisterButton;

