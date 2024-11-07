import React, { useState, useEffect } from "react";
import styles from "./CommentEditModal.module.css";
import { updateProductComment } from "../api/commentApi";

interface ProductCommentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  commentId: number;
  productId: number;
  initialContent: string;
  onCommentUpdate: (newContent: string) => void;
}

const ProductCommentEditModal: React.FC<ProductCommentEditModalProps> = ({
  isOpen,
  onClose,
  commentId,
  productId,
  initialContent,
  onCommentUpdate,
}) => {
  const [commentData, setCommentData] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCommentData(initialContent); // 모달이 열리면 원래 있던 댓글 내용으로 초기화
    }
  }, [isOpen, initialContent]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData(e.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProductComment(productId, commentId, commentData);
      alert("댓글이 수정되었습니다.");
      onCommentUpdate(commentData);
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
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>댓글 수정</h2>
          <button onClick={onClose} className={styles.closeButton}>
            닫기
          </button>
        </div>
        <textarea
          className={styles.textarea}
          value={commentData}
          onChange={handleChange}
          rows={5}
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonContainer}>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={styles.saveButton}
          >
            {isLoading ? "저장 중..." : "수정하기"}
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCommentEditModal;

