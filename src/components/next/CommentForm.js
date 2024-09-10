import { useState } from 'react';
import { useRouter } from 'next/router';
import { createComment } from '../../src/api/api'; // API에서 댓글 등록 함수 가져오기
import styles from '../../styles/commentForm.module.css';

const CommentForm = ({ articleId }) => {
  const [content, setContent] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      alert('댓글을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // createComment 함수 호출로 댓글 등록 API 요청
      const newComment = await createComment(articleId, { content });
      alert('댓글이 등록되었습니다.');
      router.reload();
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.formGroup}>
        <label htmlFor="content">댓글 달기</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력해주세요."
          style={{ height: '100px' }}
        />
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting || !content}
      >
        {isSubmitting ? '등록 중...' : '등록'}
      </button>
    </form>
  );
};

export default CommentForm;

