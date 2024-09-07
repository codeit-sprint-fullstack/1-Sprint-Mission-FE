import React, { useState } from "react";
import Image from "next/image";
import styles from "./FreeBoardCommentItem.module.css";
import AuthorProfile from "../../public/images/profile-image.png";
import UpdateDeleteButton from "../components/UpdateDeleteButton";

export default function FreeBoardCommentItem({ author, content, date }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <p className={styles.content}>댓글 내용</p>
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
          <span className={styles.author}>작성자</span>
          <span className={styles.date}>작성한 시간</span>
        </div>
      </div>

      {/* 수정/삭제 메뉴 */}
      {menuVisible && <UpdateDeleteButton />}
    </div>
  );
}
