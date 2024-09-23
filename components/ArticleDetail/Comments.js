import { useEffect, useState } from 'react';
import Button from '@/utils/Button';
import CommentList from './CommentList';
import styles from '@/styles/Comment.module.css';
import useComments from '@/hooks/useComments';
import useScroll from '@/hooks/useScroll';

export default function Comments({ articleId, category }) {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

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

  const { canScroll } = useScroll({
    comment,
    loading,
    hasMore,
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
    if (canScroll === true) {
      getComments(articleId);
    }
  }, [articleId, canEdit, canScroll]);

  useEffect(() => {
    cursorIdRef.current === null;
    setCommentsList([]);
  }, [articleId, canEdit]);

  return (
    <div className={styles.submit}>
      <div className={styles.comment}>
        {category === 'freeboard' ? '댓글달기' : '문의하기'}
      </div>
      <textarea
        placeholder={
          category === 'freeboard'
            ? '댓글을 입력해 주세요.'
            : '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
        }
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
        category={category}
      />
      {loading && <div>Loading...</div>}
    </div>
  );
}
