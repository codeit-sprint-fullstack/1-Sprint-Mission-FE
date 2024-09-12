import React from "react";
import styles from "./CommentItem.module.css";

const CommentItem = ({ id, content, author, createdAt }) => {
  const defaultData = {
    content: "저는 푸바오의 엄마 아이바오 입니다",
    author: "푸바오",
    createdAt: new Date().toLocaleDateString(),
  };

  // createdAt이 유효한 ISO 8601 날짜인지 확인하고 처리
  const displayDate = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
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
          <span>{author || defaultData.author}</span>
          <span>{displayDate}</span>
        </div>
      </div>
      <div className={styles.kebabIcon}>
        <img src="/image/kebab.svg" alt="Kebab Icon" />
      </div>
    </div>
  );
};

export default CommentItem;

