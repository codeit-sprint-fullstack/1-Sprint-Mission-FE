import React, { useState } from "react";
import CommentKebabMenu from './CommentKebabMenu';
import { updateComment } from '../api/api';
import styles from "./CommentItem.module.css";

const CommentItem = ({ id, content, author, createdAt, refreshComments }) => {
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태
  const [editedContent, setEditedContent] = useState(content); // 수정 중인 댓글 내용

  console.log("댓글 ID:", id);

  // createdAt을 날짜와 시간까지 표시하도록 처리
  const displayDate = createdAt
    ? new Date(createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    : new Date().toLocaleString();

  // 댓글 저장 처리
  const handleSaveClick = async () => {
    console.log("댓글 저장 버튼 클릭됨");
    console.log("수정된 댓글 내용:", editedContent);

    try {
      await updateComment(id, { content: editedContent }); // 댓글 수정 API 호출
      alert('댓글이 수정되었습니다.');
      console.log("댓글 수정 성공");

      setIsEditMode(false); // 수정 모드 종료
      refreshComments(); // 댓글 목록 갱신 - 수정 후 목록을 다시 불러오기
    } catch (error) {
      console.error('댓글 수정 중 오류가 발생했습니다:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
      console.log("댓글 수정 실패");
    }
  };

  return (
    <div className={styles.commentItem}>
      {isEditMode ? (
        // 수정 모드일 때
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
        // 일반 모드일 때
        <div className={styles.commentContent}>
          <p>{editedContent}</p> {/* 수정된 댓글 내용을 반영 */}
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
        commentId={id} // commentId로 댓글 ID 전달
        onEdit={() => {
          console.log("댓글 수정 모드 활성화됨");
          setIsEditMode(true);
        }} // 수정 모드 활성화
        refreshComments={refreshComments} // 삭제 후 댓글 목록 갱신
      />
    </div>
  );
};

export default CommentItem;

