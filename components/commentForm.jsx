import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth"; // useAuth 훅 import
import SmallButton from "@/components/common/SmallButton.jsx";
import styles from "@/pages/community/articles/style.module.css";
import usePostMutation from "@/hooks/usePostMutation";

const CommentForm = ({ articleId, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const { user, loading } = useAuth(); // useAuth 훅 사용

  const onSuccess = () => {
    setComment("");
    setError("");
    onCommentAdded();
  };

  const onError = () => {
    setError("댓글 등록에 실패했습니다. 다시 시도해 주세요.");
  };

  const { mutate, isLoading: isMutating } = usePostMutation(
    "createComment",
    onSuccess,
    onError
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setError("댓글을 작성하려면 로그인이 필요합니다.");
      return;
    }
    if (comment.trim()) {
      mutate({
        articleId,
        content: comment,
        userId: user.id, // user 객체에서 id를 가져옵니다.
      });
    } else {
      setError("댓글 내용을 입력해 주세요.");
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.postCommentsHug}>
        <div className={styles.postCommentTitle}>댓글달기</div>
        <textarea
          className={styles.postCommentsInput}
          placeholder={
            user
              ? "댓글을 입력해 주세요"
              : "로그인 후 댓글을 작성할 수 있습니다"
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!user}
        ></textarea>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <SmallButton
        type="submit"
        className={styles.floatright}
        disabled={isMutating || !comment.trim() || !user}
      >
        {isMutating ? "등록 중..." : "등록"}
      </SmallButton>
      {!user && (
        <p className={styles.loginMessage}>
          댓글을 작성하려면 로그인이 필요합니다.
        </p>
      )}
    </form>
  );
};

export default CommentForm;
