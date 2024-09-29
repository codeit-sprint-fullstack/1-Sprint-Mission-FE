import { useEffect, useState, useRef } from 'react';
import { CommentButton } from '@/utils/Button';
import CommentList from './CommentList';
import styles from '@/styles/Comment.module.css';
import useComments from '@/hooks/useComments';
import useScroll from '@/hooks/useScroll';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function Comments({ category }) {
  const [comment, setComment] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const { id: articleId } = router.query;

  const {
    uniqueComments,
    postCommentMutation,
    deleteComments,
    fetchNextPage,
    isLoading,
    totalCount,
  } = useComments({ articleId, category });

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (articleId && comment) {
      const newComment = { category, articleId, comment };
      postCommentMutation.mutate(newComment);
      setComment('');
    } else {
      console.log('Article ID or comment is missing.');
    }
  };

  const { canScroll } = useScroll({
    comment,
    isLoading,
    hasMore,
  });

  useEffect(() => {
    if (canScroll === true) {
      fetchNextPage();
    }
  }, [canScroll]);

  useEffect(() => {
    if (uniqueComments.length >= totalCount) {
      setHasMore(false);
    }
  }, [uniqueComments, totalCount]);

  useEffect(() => {
    if (comment) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [comment]);

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
      <CommentButton
        disabled={postCommentMutation.isPending || !isSubmit}
        onClick={handleSubmit}
        label={'등록'}
      />

      <CommentList
        articleId={articleId}
        comments={uniqueComments}
        onCommentDeleteId={deleteComments}
        category={category}
      />
      {isLoading && <div>Loading...</div>}
    </div>
  );
}
