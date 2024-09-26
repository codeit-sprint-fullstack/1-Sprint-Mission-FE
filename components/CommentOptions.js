// components/CommentOptions.js

import React, { useState } from "react";
import Image from "next/image";
import styles from "./CommentOptions.module.css";

const CommentOptions = ({ comments, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(null);

  const handleCommentOptions = (commentId) => {
    setShowOptions((prev) => (prev === commentId ? null : commentId));
  };

  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <p className={styles.commentContent}>{comment.content}</p>
          <p className={styles.commentMeta}>
            {comment.writer.nickname} -{" "}
            {new Date(comment.createdAt).toLocaleString()}
            <div className={styles.commentActions}>
              <button
                onClick={() => handleCommentOptions(comment.id)}
                className={styles.commentOptionsButton}
              >
                <Image src="/ic_kebab.png" alt="옵션" width={20} height={20} />
              </button>
              {showOptions === comment.id && (
                <div className={styles.optionsPopup}>
                  <button onClick={() => onEdit(comment.id)}>수정하기</button>
                  <button onClick={() => onDelete(comment.id)}>삭제하기</button>
                </div>
              )}
            </div>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentOptions;
