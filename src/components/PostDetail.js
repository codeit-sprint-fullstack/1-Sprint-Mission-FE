import React, { useState } from "react";
import Image from "next/image";
import AuthorProfile from "../../public/images/profile-image.png";
import Heart from "../../public/images/ic_heart.png";
import styles from "./PostDetail.module.css";
import { updateArticle, deleteArticle } from "../api/api"; // 게시글 수정 삭제 API 호출

export default function PostDetail({ post }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  // 게시글 수정 핸들러
  const handleEdit = async () => {
    try {
      const updatedData = {
        /* 수정할 데이터 */
      };
      await updateArticle(post.id, updatedData);
      alert("게시글이 수정되었습니다.");
      setMenuVisible(false); // 메뉴 닫기
    } catch (error) {
      console.error("게시글 수정 실패:", error);
    }
  };

  // 게시글 삭제 핸들러
  const handleDelete = async () => {
    try {
      await deleteArticle(post.id);
      alert("게시글이 삭제되었습니다.");
      setMenuVisible(false); // 메뉴 닫기
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  return (
    <div className={styles.postDetailItem}>
      <div className={styles.postHeaderContainer}>
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
          </div>
          <h3 className={styles.divider}>|</h3>
          {/* 좋아요 수 */}
          <button className={styles.likeCount}>
            <Image
              src={Heart}
              alt="Heart"
              className={styles.heartIcon}
              width={26.8}
              height={23.3}
            />
            좋아요수
          </button>
        </div>
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
        <button className={styles.registrationBtn}>등록</button>
      </div>

      {/* 수정/삭제 메뉴 */}
      {menuVisible && (
        <div className={styles.menu}>
          <button className={styles.menuButton} onClick={handleEdit}>
            수정하기
          </button>
          <button className={styles.menuButton} onClick={handleDelete}>
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
