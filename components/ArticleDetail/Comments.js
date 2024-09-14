import styles from '@/styles/Comment.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/utils/Button';
import CommentList from './CommentList';

export default function Comments({ articleId }) {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const [canEdit, setCanEdit] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [cursorId, setCursorId] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getComments() {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://sprint-be-k938.onrender.com/comments/${articleId}`,
          {
            params: {
              limit: 6,
              cursor: cursorId,
            },
          }
        );

        const { comments, totalCount } = res.data;

        setCursorId(
          comments.length > 0 ? comments[comments.length - 1].id : null
        );

        console.log(res.data);

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

    getComments(articleId);
  }, [articleId, canEdit, canScroll]);

  async function postComment() {
    try {
      const res = await axios.post(
        `https://sprint-be-k938.onrender.com/comments`,
        {
          content: comment,
          articleId: articleId,
          userId: '9cda174e-2e9e-4523-97cd-362e85a39ebf',
        }
      );

      setCommentsList([res.data, ...commentsList]);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  async function deleteComment(commentId) {
    try {
      const res = await axios.delete(
        `https://sprint-be-k938.onrender.com/comments/${commentId}`
      );
      setCursorId(null);
      setCommentsList([]);
      setCanEdit((prev) => !prev);
    } catch (error) {
      console.error('Error posting data:', error);
    } finally {
    }
  }

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleCommentDeleteId = (id) => {
    deleteComment(id);
  };

  useEffect(() => {
    if (comment) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [comment]);

  useEffect(() => {
    setCursorId(null);
    setCommentsList([]);
  }, [articleId, canEdit]);

  function handleSubmit() {
    postComment();
    setComment('');
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cursorId]);

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
