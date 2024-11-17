import React, { memo } from "react";
import CommentItem from "./CommentItem";
import styles from "./CommentSection.module.css";

const CommentList = memo(
  ({
    comments,
    handleUpdateComment,
    handleDeleteComment,
    updateMutation,
    deleteMutation,
  }) => {
    return (
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
            updateMutation={updateMutation}
            deleteMutation={deleteMutation}
          />
        ))}
      </ul>
    );
  }
);

CommentList.displayName = "CommentList";

export default CommentList;
