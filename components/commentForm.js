import React, { useState } from "react";
import { useMutation } from "react-query";
import SmallButton from "@/components/common/SmallButton.jsx";
import styles from "@/pages/community/posts/style.module.css";
import { postComment } from "@/utils/communityAPI";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation(postComment, {
    onSuccess: () => {
      setComment("");
      setError("");
      onCommentAdded();
    },
    onError: (error) => {
      setError("댓글 등록에 실패했습니다. 다시 시도해 주세요.");
      console.error("댓글 등록 오류:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      mutation.mutate({ postId, content: comment });
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
        disabled={mutation.isLoading || !comment.trim()}
      >
        {mutation.isLoading ? "등록 중..." : "등록"}
      </SmallButton>
    </form>
  );
};

export default CommentForm;
