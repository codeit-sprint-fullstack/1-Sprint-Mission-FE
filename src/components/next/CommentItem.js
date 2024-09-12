import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import styles from './CommentItem.module.css';

const CommentItem = ({ id = 0, author, date, content }) => {
  const formattedTime = formatDistanceToNow(new Date(date), { addSuffix: true }); // 몇시간 전 형식으로 변환

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentContent}>
        <h3 className={styles.commentTitle}>{content || '댓글 내용이 없습니다.'}</h3>
        <div className={styles.commentDetails}>
          <img src="/image/profile.svg" alt="Profile Icon" className={styles.profileIcon} />
          <span className={styles.author}>{author || '익명'}</span>
          <span className={styles.date}>{formattedTime}</span> {/* 몇 시간 전 */}
        </div>
      </div>
      <div className={styles.commentKebab}>
        <img src="/image/kebab.svg" alt="Kebab Icon" />
      </div>
    </div>
  );
};

export default CommentItem;

