import React from 'react';
import styles from './CommentItem.module.css';

const CommentItem = ({ id, content, author, createdAt }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.commentContent}>
        <p>{content}</p>
        <div className={styles.commentDetails}>
          <span>{author}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

