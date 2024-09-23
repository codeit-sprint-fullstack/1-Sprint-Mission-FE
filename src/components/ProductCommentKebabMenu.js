import React, { useState, useRef, useEffect } from 'react';
import { deleteComment } from '../api/commentApi';
import { getAccessToken } from '../api/authApi';
import styles from './ProductCommentKebabMenu.module.css';

const ProductCommentKebabMenu = ({ commentId, onEdit, refreshComments }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // 케밥 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKebabClick = () => {
    setShowMenu(!showMenu);
    console.log("케밥 메뉴 버튼 클릭됨, 메뉴 상태:", showMenu ? "닫힘" : "열림");
  };

  // 댓글 삭제 처리
  const handleDeleteClick = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      alert("인증 토큰이 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      await deleteComment(commentId, accessToken);
      alert('댓글이 삭제되었습니다.');
      refreshComments(); // 삭제 후 목록 갱신 처리
      setShowMenu(false); // 메뉴 닫기
    } catch (error) {
      console.error('댓글 삭제 중 오류가 발생했습니다:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.container} ref={menuRef}>
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

export default ProductCommentKebabMenu;

