import React, { useState } from "react";
import { updateComment } from '../api/commentApi';
import { formatDate } from '../utils/formatDate';
import styles from "./ProductCommentItem.module.css";

const ProductCommentItem = ({ id, content, createdAt, author, refreshComments }) => {  // author를 props로 받음
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const displayDate = formatDate(createdAt);

  const handleSaveClick = async () => {
    try {
      await updateComment(id, editedContent);
      alert('댓글이 수정되었습니다.');
      setIsEditMode(false);
      refreshComments();
    } catch (error) {
      console.error('댓글 수정 중 오류가 발생했습니다:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.commentItem}>
      {isEditMode ? (
        <div className={styles.editMode}>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows="3"
            className={styles.textarea}
          />
          <button onClick={handleSaveClick}>저장</button>
          <button onClick={() => setIsEditMode(false)}>취소</button>
        </div>
      ) : (
        <div className={styles.commentContent}>
          <p>{editedContent}</p>
          <div className={styles.commentDetails}>
            <img
              src="/image/profile.svg"
              alt="Profile Icon"
              className={styles.profileIcon}
            />
            <span className={styles.author}>{author}</span>
            <span className={styles.date}>{displayDate}</span>
          </div>
        </div>
      )}

      <img
        src="/image/kebab.svg"
        alt="Kebab Menu"
        className={styles.kebabIcon}
        onClick={() => setIsEditMode(true)}
      />
    </div>
  );
};

export default ProductCommentItem;

