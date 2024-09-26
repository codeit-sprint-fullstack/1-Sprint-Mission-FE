import React, { useState, useEffect } from "react";
import style from "./CommentEditModal.module.css";
import { updateComment } from "../api/commentApi";
import { getAccessToken } from "../api/authApi";

const CommentEditModal = ({
  isOpen,
  onClose,
  commentId,
  initialContent,
  onCommentUpdate,
}) => {
  const [commentData, setCommentData] = useState(initialContent || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCommentData(initialContent); // 모달이 열리면 원래 있던 댓글 내용으로 초기화
    }
  }, [isOpen, initialContent]);

  const handleChange = (e) => {
    setCommentData(e.target.value);
  };

  const handleSave = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      alert("인증 토큰이 없습니다. 다시 로그인해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await updateComment(commentId, commentData, accessToken);
      alert("댓글이 수정되었습니다.");

      if (typeof onCommentUpdate === "function") {
        onCommentUpdate(commentData);
      }

      onClose();
    } catch (error) {
      console.error("댓글 수정 중 오류가 발생했습니다:", error);
      setError("댓글 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContainer}>
        <div className={style.modalHeader}>
          <h2>댓글 수정</h2>
          <button onClick={onClose} className={style.closeButton}>
            닫기
          </button>
        </div>
        <textarea
          className={style.textarea}
          value={commentData}
          onChange={handleChange}
          rows="5"
        />
        {error && <p className={style.error}>{error}</p>}
        <div className={style.buttonContainer}>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={style.saveButton}
          >
            {isLoading ? "저장 중..." : "수정하기"}
          </button>
          <button onClick={onClose} className={style.cancelButton}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentEditModal;

