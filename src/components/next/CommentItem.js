import React from 'react';
import styles from './CommentItem.module.css';

const CommentItem = ({ id, content, author, createdAt }) => {
  const defaultData = {
    content: '저는 푸바오의 엄마 아이바오 입니다',
    author: '푸바오',
    createdAt: new Date().toLocaleDateString(),
  };

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentContent}>
        <p>{content || defaultData.content}</p>
        <div className={styles.commentDetails}>
          <span>{author || defaultData.author}</span> 
          <span>{new Date(createdAt).toLocaleDateString() || defaultData.createdAt}</span> 
        </div>
      </div>
      <div className={styles.kebabIcon}>
        <img src="/image/kebab.svg" alt="Kebab Icon" />
      </div>
    </div>
  );
};

export default CommentItem;
