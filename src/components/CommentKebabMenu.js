import React, { useState } from 'react';
import { deleteComment } from '../api/api';
import styles from './CommentKebabMenu.module.css';

const CommentKebabMenu = ({ commentId, onEdit, refreshComments }) => {
  const [showMenu, setShowMenu] = useState(false);

  console.log("전달된 댓글 ID:", commentId); 

  const handleKebabClick = () => {
    setShowMenu(!showMenu); // 케밥 버튼 클릭 시 토글
    console.log("케밥 메뉴 버튼 클릭됨, 메뉴 상태:", showMenu ? "닫힘" : "열림");
  };

  // 댓글 삭제 처리
  const handleDeleteClick = async () => {
    console.log("댓글 삭제 버튼 클릭됨, 댓글 ID:", commentId);
    try {
      await deleteComment(commentId); // 댓글 삭제 API 호출
      alert('댓글이 삭제되었습니다.');
      console.log("댓글 삭제 성공");
      refreshComments(); // 댓글 목록 갱신
      setShowMenu(false); // 메뉴 닫기
    } catch (error) {
      console.error('댓글 삭제 중 오류가 발생했습니다:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
      console.log("댓글 삭제 실패");
    }
  };

  return (
    <div className={styles.container}>
      <img
        src="/image/kebab.svg"
        alt="Kebab Icon"
        className={styles.kebabIcon}
        onClick={handleKebabClick}
      />
      {showMenu && (
        <div className={styles.kebabMenu}>
          <div className={styles.menuItem} onClick={onEdit}>댓글 수정</div>
          <div className={styles.menuItem} onClick={handleDeleteClick}>댓글 삭제</div>
        </div>
      )}
    </div>
  );
};

export default CommentKebabMenu;

