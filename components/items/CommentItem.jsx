import React, { useState, useMemo, memo } from "react";
import KebabMenu from "@/components/postDetail/KebabMenu";
import { formatRelativeTime } from "@/utils/dateRelativeUtils";
import styles from "./CommentSection.module.css";

const CommentItem = memo(
  ({
    comment,
    handleUpdateComment,
    handleDeleteComment,
    updateMutation,
    deleteMutation,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const handleEdit = () => {
      setIsEditing(true);
      setEditedContent(comment.content);
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
      setEditedContent(comment.content);
    };

    const handleSaveEdit = () => {
      handleUpdateComment(comment.id, editedContent);
      setIsEditing(false);
    };

    const kebabMenuOptions = useMemo(
      () => [
        { label: "수정하기", onClick: handleEdit },
        { label: "삭제하기", onClick: () => handleDeleteComment(comment.id) },
      ],
      [handleEdit, handleDeleteComment, comment.id]
    );

    return (
      <li className={styles.commentItem}>
        {isEditing ? (
          <div className={styles.editCommentForm}>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={styles.commentInput}
              aria-label="댓글 수정"
            />
            <div className={styles.editButtons}>
              <button
                onClick={handleSaveEdit}
                className={styles.button}
                disabled={updateMutation.isLoading}
                aria-label="댓글 수정 완료"
              >
                {updateMutation.isLoading ? "수정 중..." : "수정 완료"}
              </button>
              <button
                onClick={handleCancelEdit}
                className={styles.button}
                aria-label="댓글 수정 취소"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.commentContent}>
            <p className={styles.commentText}>{comment.content}</p>
            <KebabMenu options={kebabMenuOptions} />
          </div>
        )}
        <div className={styles.commentProfileTextHug}>
          <img
            src="/images/ic_profile.svg"
            alt="프로필 아이콘"
            className={styles.commentProfile}
          />
          <div className={styles.commentMeta}>
            <span className={styles.commentAuthor}>
              {comment.writer.nickname}
            </span>
            <span className={styles.commentDate}>
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
        </div>
      </li>
    );
  }
);

CommentItem.displayName = "CommentItem";

export default CommentItem;
