import React, { useState } from "react";
import Image from "next/image";
import styles from "./FreeBoardCommentItem.module.css";
import AuthorProfile from "../../public/images/profile-image.png";
import UpdateDeleteButton from "../components/UpdateDeleteButton"; // 수정/삭제 버튼 컴포넌트

export default function FreeBoardCommentItem({
  commentId,
  author,
  content,
  date,
  onEdit,
  onDelete,
}) {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <p className={styles.content}>{content}</p>
        <button className={styles.moreMenuButton} onClick={toggleMenu}>
          :
        </button>
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
          <span className={styles.author}>{author}</span>
          <span className={styles.date}>
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* 수정/삭제 메뉴 */}
      {menuVisible && (
        <UpdateDeleteButton
          onEdit={() => onEdit(commentId)} // 댓글 수정 핸들러
          onDelete={() => onDelete(commentId)} // 댓글 삭제 핸들러
        />
      )}
    </div>
  );
}
