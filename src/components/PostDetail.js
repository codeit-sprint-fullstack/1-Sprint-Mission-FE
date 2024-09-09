import React, { useState } from "react";
import Image from "next/image";
import AuthorProfile from "../../public/images/profile-image.png";
import Heart from "../../public/images/ic_heart.png";
import styles from "./PostDetail.module.css";
import { updateArticle, deleteArticle, createComment } from "../api/api"; // 수정, 삭제, 댓글 등록 API 호출
import UpdateDeleteButton from "./UpdateDeleteButton"; // 수정/삭제 컴포넌트

export default function PostDetail({ post, onCommentSubmit }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedContent, setUpdatedContent] = useState(post.content);

  // 댓글 관련 상태
  const [comment, setComment] = useState("");
  const [isCommentButtonEnabled, setIsCommentButtonEnabled] = useState(false);

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
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  // 댓글 입력 핸들러
  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
    setIsCommentButtonEnabled(value.trim().length > 0); // 입력값이 있으면 버튼 활성화
  };

  // 댓글 등록 핸들러
  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const commentData = {
          postId: post.id, // 게시글 ID
          content: comment,
          author: "작성자 판다",
          createdAt: new Date().toISOString(), // 작성한 시간(현재시간)
        };
        await onCommentSubmit(commentData); // prop으로 전달된 핸들러 호출
        setComment(""); // 입력 필드 초기화
        setIsCommentButtonEnabled(false); // 버튼 비활성화
      } catch (error) {
        console.error("댓글 등록 실패:", error);
      }
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
            value={comment}
            onChange={handleCommentChange}
            className={styles.commentInput}
            placeholder="댓글을 입력해주세요"
          />
        </label>
        <button
          className={styles.registrationBtn}
          onClick={handleCommentSubmit}
          disabled={!isCommentButtonEnabled}
        >
          등록
        </button>
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
