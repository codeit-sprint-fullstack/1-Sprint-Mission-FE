import { CommentButton, CommentCancelButton } from '@/utils/Button';
import styles from '@/styles/Comment.module.css';
import useComments from '@/hooks/useComments';
import { useState } from 'react';
import { editCommentApi } from '@/utils/api/commentApi.js';

import {
  useMutation,
  useQueryClient,
  useFilterParams,
} from '@tanstack/react-query';

export default function EditComment({
  commentId,
  articleId,
  content,
  category,
  setEditId,
  setOpenOptions,
}) {
  const [editComment, setEditComment] = useState(content);
  const handleCommentChange = (event) => {
    setEditComment(event.target.value);
  };

  const { updateComment } = useComments({ articleId, category });

  const handleSubmit = () => {
    updateComment.mutate({ id: commentId, editComment, articleId });
    setEditId(null);
    setOpenOptions(false);
  };

  const handleCancelSubmit = () => {
    setEditId(null);
    setOpenOptions(false);
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
