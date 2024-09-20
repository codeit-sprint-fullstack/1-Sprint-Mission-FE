import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./FreeBoardCommentItem.module.css";
import AuthorProfile from "../../public/images/profile-image.png";
import UpdateDeleteButton from "../components/UpdateDeleteButton"; // 수정/삭제 버튼 컴포넌트
import { updateComment, deleteComment } from "../api/api"; // API 호출 함수

export default function FreeBoardCommentItem({ comment, onCommentUpdate }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  // 메뉴를 참조하기 위한 ref
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  // 댓글 수정 핸들러
  const handleEdit = async () => {
    if (editedContent.trim()) {
      try {
        await updateComment(comment.id, { content: editedContent });
        setIsEditing(false);
        onCommentUpdate(); // 댓글 수정 후, 상위 컴포넌트에 알림
      } catch (error) {
        console.error("댓글 수정 실패:", error);
      }
    }
  };

  // 댓글 삭제 핸들러
  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      setMenuVisible(false);
      onCommentUpdate(); // 부모 컴포넌트에 댓글 삭제를 알림
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  // 댓글 수정 입력 핸들러
  const handleChange = (e) => setEditedContent(e.target.value);

  // 메뉴를 닫는 함수
  const closeMenu = (e) => {
    // 클릭된 위치가 메뉴 외부인지 확인
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", closeMenu);

    // 컴포넌트 언마운트 시 클릭 이벤트 리스너 제거
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        {isEditing ? (
          <>
            <div className={styles.editMode}>
              <textarea
                value={editedContent}
                onChange={handleChange}
                className={styles.editTextarea}
              />
              <button onClick={handleEdit} className={styles.saveButton}>
                저장
              </button>
            </div>
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
          <span className={styles.author}>{comment.author}</span>
          <span className={styles.date}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* 수정/삭제 메뉴 */}
      {menuVisible && (
        <div ref={menuRef}>
          <UpdateDeleteButton
            onEdit={() => setIsEditing(true)} // 수정 버튼 클릭 시 편집 모드로 전환
            onDelete={handleDelete} // 삭제버튼 클릭 시 댓글 삭제
          />
        </div>
      )}
    </div>
  );
}
