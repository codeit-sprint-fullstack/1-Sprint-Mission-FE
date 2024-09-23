import React, { useState } from "react";
import { updateComment } from '../api/commentApi';
import { getAccessToken } from '../api/authApi'; 
import { formatDate } from '../utils/formatDate';
import ProductCommentKebabMenu from './ProductCommentKebabMenu';
import styles from "./ProductCommentItem.module.css";

const ProductCommentItem = ({ id, content, createdAt, author, refreshComments }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const displayDate = formatDate(createdAt);

  const handleSaveClick = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      alert("인증 토큰이 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      await updateComment(id, editedContent, accessToken);
      alert('댓글이 수정되었습니다.');
      setIsEditMode(false);
      refreshComments(); // 수정 후 댓글 목록 갱신
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

      <ProductCommentKebabMenu 
        commentId={id} 
        onEdit={() => setIsEditMode(true)} 
        refreshComments={refreshComments}  // 삭제 후 목록 갱신 처리
      />
    </div>
  );
};

export default ProductCommentItem;

