import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ProductCommentItem.module.css";
import AuthorProfile from "../../public/images/profile-image.png";
import UpdateDeleteButton from "../components/UpdateDeleteButton"; // 수정/삭제 버튼 컴포넌트
import { updateMarketComment, deleteMarketComment } from "../api/api"; // API 호출 함수

export default function ProductCommentItem({
  comment,
  itemId,
  onCommentUpdate,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const menuRef = useRef(null);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  // 댓글 수정 핸들러
  const handleEdit = async () => {
    if (editedContent.trim()) {
      try {
        console.log("댓글 ID:", comment.id);

        await updateMarketComment(comment.id, {
          content: editedContent,
        });
        setIsEditing(false);
        onCommentUpdate(comment.id, { content: editedContent });
      } catch (error) {
        console.error(
          "댓글 수정 실패:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  // 댓글 삭제 핸들러
  const handleDelete = async () => {
    try {
      await deleteMarketComment(comment.id);
      setMenuVisible(false);
      onCommentUpdate(comment.id); // 댓글 ID를 통해 업데이트
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const handleChange = (e) => setEditedContent(e.target.value);

  const closeMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={handleChange}
              className={styles.editTextarea}
            />
            <button onClick={handleEdit} className={styles.saveButton}>
              저장
            </button>
          </>
        ) : (
          <p className={styles.content}>{comment.content}</p>
        )}
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
          <span className={styles.author}>{comment.writer.nickname}</span>
          <span className={styles.date}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {menuVisible && (
        <div ref={menuRef}>
          <UpdateDeleteButton
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}
