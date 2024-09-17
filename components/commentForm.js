import React, { useState } from "react";
import SmallButton from "@/components/common/SmallButton.jsx";
import styles from "@/pages/community/posts/style.module.css";
import usePostMutation from "@/hooks/usePostMutation";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const { mutateComment, isLoading } = usePostMutation(
    () => {
      setComment("");
      setError("");
      onCommentAdded();
    },
    () => {
      setError("댓글 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      mutateComment({ postId, content: comment });
    } else {
      setError("댓글 내용을 입력해 주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.postCommentsHug}>
        <div className={styles.postCommentTitle}>댓글달기</div>
        <textarea
          className={styles.postCommentsInput}
          placeholder="댓글을 입력해 주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <SmallButton
        type="submit"
        className={styles.floatright}
        disabled={isLoading || !comment.trim()}
      >
        {isLoading ? "등록 중..." : "등록"}
      </SmallButton>
    </form>
  );
};

export default CommentForm;
