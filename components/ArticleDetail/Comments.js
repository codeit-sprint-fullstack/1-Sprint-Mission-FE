import { useEffect, useState } from 'react';
import Button from '@/utils/Button';
import {
  fetchComments,
  postComment,
  deleteComment,
} from '@/utils/api/commentApi.js';
import CommentList from './CommentList';
import styles from '@/styles/Comment.module.css';

export default function Comments({ articleId }) {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const [canEdit, setCanEdit] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [cursorId, setCursorId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  async function getComments(articleId) {
    setLoading(true);
    try {
      const res = await fetchComments(articleId, cursorId);
      const { comments, totalCount } = res;

      setCursorId(
        comments.length > 0 ? comments[comments.length - 1].id : null
      );

      const mergedItems = [...commentsList, ...comments.slice(0, 5)];
      const uniqueComments = Array.from(
        new Map(mergedItems.map((item) => [item.id, item])).values()
      );

      if (uniqueComments.length >= totalCount) {
        setHasMore(false);
      }

      setCommentsList(uniqueComments);
    } catch (error) {
      console.error('Error posting data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleCommentDeleteId = async (id) => {
    try {
      const res = await deleteComment(id);
      setCursorId(null);
      setCommentsList([]);
      setCanEdit((prev) => !prev);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await postComment(articleId, comment);

      setCommentsList([res, ...commentsList]);
    } catch (error) {
      console.error('Error posting data:', error);
    }
    setComment('');
  };

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

  useEffect(() => {
    if (comment) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [comment]);

  useEffect(() => {
    getComments(articleId);
  }, []);

  useEffect(() => {
    getComments(articleId);
  }, [articleId, canEdit, canScroll]);

  useEffect(() => {
    setCursorId(null);
    setCommentsList([]);
  }, [articleId, canEdit]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cursorId]);

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
