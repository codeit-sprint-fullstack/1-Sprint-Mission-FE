import { useState } from 'react';
import { useRouter } from 'next/router';
import { createComment } from '../../api/api'; 
import styles from './CommentForm.module.css';

const CommentForm = ({ articleId }) => {
  const [content, setContent] = useState(''); // 댓글 입력 상태
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
      const newComment = await createComment(articleId, { content }); // 댓글 서버에 등록
      alert('댓글이 등록되었습니다.');
      router.reload(); // 페이지 리로드하여 댓글 갱신
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
          onChange={(e) => setContent(e.target.value)} // 입력된 댓글 상태 업데이트
          placeholder="댓글을 입력해주세요."
          style={{ height: '100px' }}
        />
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting || !content} // 댓글이 입력되지 않았으면 버튼 비활성화
      >
        {isSubmitting ? '등록 중...' : '등록'}
      </button>
    </form>
  );
};

export default CommentForm;

