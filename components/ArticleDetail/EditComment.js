import axios from 'axios';
import Button from '@/utils/Button';
import styles from '@/styles/Comment.module.css';

import { useState } from 'react';

export default function CommentList({
  id,
  content,
  setEditId,
  setComments,
  setOpenOptions,
}) {
  const [editComment, setEditComment] = useState(content);

  async function patchComment(id) {
    try {
      const res = await axios.patch(
        `https://sprint-be-k938.onrender.com/comments/${id}`,
        {
          content: editComment,
        }
      );

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id ? { ...comment, content: editComment } : comment
        )
      );

      setEditId(null);
      setOpenOptions(false);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  const handleCommentChange = (event) => {
    setEditComment(event.target.value);
  };

  const handleSubmit = () => {
    patchComment(id);
  };

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
        <Button disabled={!editComment} onClick={handleSubmit} label='수정' />
      </div>
    </>
  );
}
