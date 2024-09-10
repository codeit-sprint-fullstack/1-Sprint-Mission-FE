import styles from '@/styles/Comment.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentList from './CommentList';

export default function Comments({ articleId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState('');
  const [edit, setEdit] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  async function getComments(articleId) {
    try {
      const res = await axios.get(
        `https://sprint-be-h8kw.onrender.com/comments/${articleId}`
      );
      const nextArticle = res.data;
      setEdit(null);
      if (nextArticle) {
        setComments(nextArticle);
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  async function postComment() {
    try {
      const res = await axios.post(
        `https://sprint-be-h8kw.onrender.com/comments`,
        {
          content: comment,
          articleId: articleId,
          userId: '3160c83b-8dcc-4ca2-9d51-717c5246d414',
        }
      );
      setComments([res.data, ...comments]);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  async function deleteComment(commentId) {
    try {
      const res = await axios.delete(
        `https://sprint-be-h8kw.onrender.com/comments/${commentId}`,
        {
          content: comment,
          articleId: articleId,
          userId: '3160c83b-8dcc-4ca2-9d51-717c5246d414',
        }
      );
      getComments(articleId);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

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
    getComments(articleId);
  }, [edit, articleId]);

  function handleSubmit(e) {
    postComment();
    setComment('');
  }

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
      <button
        disabled={!canSubmit}
        className={canSubmit ? styles.submitBtn : styles.btn}
        type='button'
        onClick={handleSubmit}
      >
        등록
      </button>

      <CommentList
        comments={comments}
        onCommentDeleteId={handleCommentDeleteId}
        setComments={setEdit}
      />
    </div>
  );
}
