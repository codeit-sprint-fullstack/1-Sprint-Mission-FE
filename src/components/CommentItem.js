import React, { useState } from "react";
import CommentKebabMenu from './CommentKebabMenu';
import { updateComment } from '../api/api';
import { formatDate } from '../utils/formatDate';
import styles from "./CommentItem.module.css";

const CommentItem = ({ id, content, author, createdAt, refreshComments }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  console.log("댓글 ID:", id);

  // 포맷팅 함수로 createdAt 처리
  const displayDate = formatDate(createdAt);

  const handleSaveClick = async () => {
    console.log("댓글 저장 버튼 클릭됨");
    console.log("수정된 댓글 내용:", editedContent);

    try {
      await updateComment(id, { content: editedContent });
      alert('댓글이 수정되었습니다.');
      console.log("댓글 수정 성공");

      setIsEditMode(false);
      refreshComments();
    } catch (error) {
      console.error('댓글 수정 중 오류가 발생했습니다:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
      console.log("댓글 수정 실패");
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

      <CommentKebabMenu
        commentId={id}
        onEdit={() => {
          console.log("댓글 수정 모드 활성화됨");
          setIsEditMode(true);
        }}
        refreshComments={refreshComments}
      />
    </div>
  );
};

export default CommentItem;

