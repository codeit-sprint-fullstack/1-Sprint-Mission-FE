import React from "react";
import styles from "./CommentItem.module.css";

const CommentItem = ({ id, content, author, createdAt }) => {
  const defaultData = {
    content: "저는 푸바오의 엄마 아이바오 입니다",
    author: "아이바오",
    createdAt: new Date().toLocaleString(), // 기본값도 시간을 포함한 형식으로
  };

  // createdAt을 날짜와 시간까지 표시하도록 처리
  const displayDate = createdAt
    ? new Date(createdAt).toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    : defaultData.createdAt;

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentContent}>
        <p>{content || defaultData.content}</p>
        <div className={styles.commentDetails}>
          <img
            src="/image/profile.svg"
            alt="Profile Icon"
            className={styles.profileIcon}
          />
          <span className={styles.author}>{author || defaultData.author}</span>
          <span className={styles.date}>{displayDate}</span>
        </div>
      </div>
      <div className={styles.kebabIcon}>
        <img src="/image/kebab.svg" alt="Kebab Icon" />
      </div>
    </div>
  );
};

export default CommentItem;

