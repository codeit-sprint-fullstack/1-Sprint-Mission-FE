import React from "react";
import Image from "next/image";
import styles from "./FreeBoardCommentItem.module.css";
import AuthorProfile from "../../public/images/profile-image.png";

export default function FreeBoardCommentItem({ author, content, date }) {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <p className={styles.content}>댓글 내용</p>
        <button className={styles.moreMenuButton}>:</button>
      </div>
      <div className={styles.imageAuthorDate}>
        <Image
          src={AuthorProfile}
          alt="Profile"
          className={styles.profileImage}
          width={32}
          height={32}
        />
        <div className={styles.authorDate}>
          <span className={styles.author}>작성자</span>
          <span className={styles.date}>작성한 시간</span>
        </div>
      </div>
    </div>
  );
}
