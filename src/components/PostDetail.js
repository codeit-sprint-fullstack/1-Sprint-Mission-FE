import React, { useState } from "react";
import Image from "next/image";
import AuthorProfile from "../../public/images/profile-image.png"; // 이미지 경로
import styles from "./PostDetail.module.css";

export default function PostDetail({ post }) {
  const [menuVisible, setMenuVisible] = useState(false);

  // 메뉴 토글 핸들러
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className={styles.postDetailItem}>
      <div className={styles.postHeader}>
        <h3 className={styles.postTitle}>*제목</h3>
        <button className={styles.moreMenuButton} onClick={toggleMenu}>
          :
        </button>
      </div>
      <div className={styles.postFooter}>
        <div className={styles.postAuthorDate}>
          <Image
            src={AuthorProfile}
            alt="Profile"
            className={styles.profileImage}
            width={40}
            height={40}
          />
          <span className={styles.authorName}>* 작성자</span>
          <span className={styles.postDate}>
            날짜{/* {new Date(post.createdAt).toLocaleDateString()} */}
          </span>
          <h3 className={styles.divider}>|</h3>
        </div>
        {/* 좋아요 수 */}
        <span className={styles.likeCount}>💙 좋아요수</span>
      </div>
      {/* 게시글 내용 */}
      <div className={styles.postContent}>* 게시글 내용</div>
      <div className={styles.postCommentDalki}>
        <h3 className={styles.commentDalkiH3}>댓글달기</h3>
        <label className={styles.detailCommentContainer}>
          <textarea
            name="content"
            className={styles.commentInput}
            placeholder="댓글을 입력해주세요"
          />
        </label>
      </div>
    </div>
  );
}
