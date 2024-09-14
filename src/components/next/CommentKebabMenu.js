import React, { useState } from 'react';
import { deleteComment } from '../../api/api'; // 댓글 삭제 API 불러오기
import styles from './CommentKebabMenu.module.css';

const CommentKebabMenu = ({ commentId, onEdit, refreshComments }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleKebabClick = () => {
    setShowMenu(!showMenu); // 케밥 버튼 클릭 시 토글
  };

  // 댓글 삭제 처리
  const handleDeleteClick = async () => {
    try {
      await deleteComment(commentId); // 댓글 삭제 API 호출
      alert('댓글이 삭제되었습니다.');
      refreshComments(); // 댓글 목록 갱신
      setShowMenu(false); // 메뉴 닫기
    } catch (error) {
      console.error('댓글 삭제 중 오류가 발생했습니다:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
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
