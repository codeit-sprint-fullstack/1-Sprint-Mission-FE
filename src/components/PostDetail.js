import React, { useState } from "react";
import Image from "next/image";
import AuthorProfile from "../../public/images/profile-image.png";
import Heart from "../../public/images/ic_heart.png";
import styles from "./PostDetail.module.css";
import { updateArticle, deleteArticle } from "../api/api"; // 수정하기 삭제하기 API 호출
import UpdateDeleteButton from "./UpdateDeleteButton"; // 수정/삭제 컴포넌트

export default function PostDetail({ post }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedContent, setUpdatedContent] = useState(post.content);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleEdit = () => setIsEditing(!isEditing);

  // 게시글 수정 핸들러
  const handleEdit = async () => {
    try {
      const updatedData = {
        title: updatedTitle,
        content: updatedContent,
      };
      await updateArticle(post.id, updatedData);
      setMenuVisible(false);
      setIsEditing(false);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
    }
  };

  // 게시글 삭제 핸들러
  const handleDelete = async () => {
    try {
      await deleteArticle(post.id);
      // 삭제 후 목록으로 이동하는 기능 추가 가능
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  return (
    <div className={styles.postDetailItem}>
      <div className={styles.postHeaderContainer}>
        <div className={styles.postHeader}>
          {isEditing ? (
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className={styles.postTitle}
            />
          ) : (
            <h3 className={styles.postTitle}>{post.title}</h3>
          )}
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
            <span className={styles.authorName}>{post.author}</span>
            <span className={styles.postDate}>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h3 className={styles.divider}>|</h3>
          <button className={styles.likeCount}>
            <Image
              src={Heart}
              alt="Heart"
              className={styles.heartIcon}
              width={26.8}
              height={23.3}
            />
            {post.likeCount}
          </button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          className={styles.postContent}
        />
      ) : (
        <div className={styles.postContent}>{post.content}</div>
      )}
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
        <UpdateDeleteButton
          onEdit={handleEdit}
          onDelete={handleDelete}
          isEditing={isEditing}
          toggleEdit={toggleEdit}
        />
      )}
    </div>
  );
}
