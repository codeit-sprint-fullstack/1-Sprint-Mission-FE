import axios from 'axios';
import styles from '@/styles/Comment.module.css';
import { useEffect, useState } from 'react';

export default function CommentList({
  id,
  content,
  setEditId,
  setComments,
  setOpenOptions,
}) {
  const [editComment, setEditComment] = useState(content);
  const [submit, setSubmit] = useState(false);

  async function patchComment(id) {
    try {
      const res = await axios.patch(
        `https://sprint-be-h8kw.onrender.com/comments/${id}`,
        {
          content: editComment,
        }
      );
      setComments(res.data);
      setEditId(null);
      setOpenOptions(false);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  const handleCommentChange = (event) => {
    setEditComment(event.target.value);
  };

  function handleSubmit() {
    patchComment(id);
  }

  useEffect(() => {
    if (editComment) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [editComment]);

  return (
    <>
      <div className={styles.editSubmit}>
        <div className={styles.comment}>댓글 수정하기</div>
        <textarea
          value={editComment}
          onChange={handleCommentChange}
          placeholder='댓글을 입력해 주세요.'
          type='text'
          className={styles.inputComment}
        />
        <button
          disabled={!submit}
          className={submit ? styles.submitBtn : styles.btn}
          onClick={handleSubmit}
          type='button'
        >
          수정
        </button>
      </div>
    </>
  );
}
