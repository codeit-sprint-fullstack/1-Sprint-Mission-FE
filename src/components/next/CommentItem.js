import React from 'react';
import styles from './CommentItem.module.css';

const CommentItem = ({ id = 0, author, date, content }) => {
  // 날짜를 "YYYY년 MM월 DD일 HH:mm:ss" 형식으로 변환
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = new Date(date).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentContent}>
        <h3 className={styles.commentTitle}>{content || '댓글 내용이 없습니다.'}</h3>
        <div className={styles.commentDetails}>
          <img src="/image/profile.svg" alt="Profile Icon" className={styles.profileIcon} />
          <span className={styles.author}>{author || '익명'}</span>
          <span className={styles.date}>
            {formattedDate} {formattedTime} {/* 년, 월, 일, 시, 분, 초 */}
          </span>
        </div>
      </div>
      <div className={styles.commentKebab}>
        <img src="/image/kebab.svg" alt="Kebab Icon" />
      </div>
    </div>
  );
};

export default CommentItem;

