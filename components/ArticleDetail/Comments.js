import { useEffect, useState } from 'react';
import Button from '@/utils/Button';
import CommentList from './CommentList';
import styles from '@/styles/Comment.module.css';
import useComments from '@/hooks/useComments';

export default function Comments({ articleId }) {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [canScroll, setCanScroll] = useState(false);

  const {
    getComments,
    deleteComments,
    postComment,
    canEdit,
    canSubmit,
    loading,
    cursorIdRef,
    hasMore,
  } = useComments({
    articleId,
    comment,
    setCommentsList,
    commentsList,
  });

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleCommentDeleteId = (targetId) => {
    deleteComments(targetId);
  };

  const handleSubmit = () => {
    if (articleId && comment) {
      postComment(articleId, comment);
      setComment('');
    } else {
      console.log('Article ID or comment is missing.');
    }
  };

  useEffect(() => {
    getComments(articleId);
  }, [articleId, canEdit, canScroll]);

  useEffect(() => {
    cursorIdRef.current === null;
    setCommentsList([]);
  }, [articleId, canEdit]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100 && !canScroll) {
        setCanScroll(true);
      } else {
        setCanScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [comment]);

  return (
    <div className={styles.submit}>
      <div className={styles.comment}>댓글달기</div>
      <textarea
        placeholder='댓글을 입력해 주세요.'
        type='text'
        value={comment}
        onChange={handleComment}
        className={styles.inputComment}
      />
      <Button disabled={!canSubmit} onClick={handleSubmit} label={'등록'} />

      <CommentList
        comments={commentsList}
        onCommentDeleteId={handleCommentDeleteId}
        setComments={setCommentsList}
      />
      {loading && <div>Loading...</div>}
    </div>
  );
}
