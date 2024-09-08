import styles from '@/styles/Comment.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentList from './CommentList';

export default function Comments({ comments, articleId }) {
  const [comment, setComment] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleComment = (event) => {
    setComment(event.target.value);
  };

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
      console.log(res.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  useEffect(() => {
    if (comment) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [comment]);

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
        disabled={!submit}
        className={submit ? styles.submitBtn : styles.btn}
        type='button'
        onClick={handleSubmit}
      >
        등록
      </button>

      <CommentList comments={comments} />
    </div>
  );
}
