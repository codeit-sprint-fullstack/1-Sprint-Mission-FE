import { CommentButton, CommentCancelButton } from '@/utils/Button';
import styles from '@/styles/Comment.module.css';
import { useEditComment } from '@/hooks/useComments';
import { useState } from 'react';

export default function EditComment({
  commentId,
  articleId,
  content,
  setEditId,
  setIsOpenDropDown,
}) {
  const [editComment, setEditComment] = useState(content);
  const handleCommentChange = (event) => {
    setEditComment(event.target.value);
  };

  const { editCommentMutation } = useEditComment({ articleId });

  const handleSubmit = () => {
    editCommentMutation.mutate({ id: commentId, editComment, articleId });
    setEditId(null);
    setIsOpenDropDown(false);
  };

  const handleCancelSubmit = () => {
    setEditId(null);
    setIsOpenDropDown(false);
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

        <CommentCancelButton onClick={handleCancelSubmit} label='취소' />

        <CommentButton
          disabled={!editComment}
          onClick={handleSubmit}
          label='수정'
        />
      </div>
    </>
  );
}
