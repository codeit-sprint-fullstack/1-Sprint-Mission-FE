import React, { useState, FormEvent, ChangeEvent } from "react";
import { createArticleComment } from "../api/commentApi";
import styles from "./CommentForm.module.css";

interface CommentFormProps {
  articleId: number;
  addNewComment: (comment: CommentResponse) => void;
}

interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  articleId?: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId, addNewComment }) => {
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newComment = await createArticleComment(articleId, content);
      alert("댓글이 등록되었습니다.");
      addNewComment(newComment);
      setContent(""); // 댓글 입력 필드 초기화
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.formGroup}>
        <label htmlFor="content">댓글 달기</label>
        <textarea
          id="content"
          value={content}
          onChange={handleChange}
          placeholder="댓글을 입력해주세요."
          style={{ height: "100px" }}
        />
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting || !content}
      >
        {isSubmitting ? "등록 중..." : "등록"}
      </button>
    </form>
  );
};

export default CommentForm;

