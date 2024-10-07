import React, { useState, useRef, useEffect } from 'react';
import { deleteProductComment } from '../api/commentApi';
import { getAccessToken } from '../api/authApi';
import CommentEditModal from './CommentEditModal';
import styles from './ProductCommentKebabMenu.module.css';

const ProductCommentKebabMenu = ({ commentId, productId, initialContent, refreshComments }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const menuRef = useRef(null);

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

  const handleDeleteClick = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      alert("인증 토큰이 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      await deleteProductComment(productId, commentId, accessToken);
      alert('댓글이 삭제되었습니다.');
      refreshComments();  // 댓글 삭제 후 댓글 목록 새로고침
      setShowMenu(false);
    } catch (error) {
      console.error('댓글 삭제 중 오류가 발생했습니다:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setShowMenu(false);
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
          <div className={styles.menuItem} onClick={handleEditClick}>댓글 수정</div>
          <div className={styles.menuItem} onClick={handleDeleteClick}>댓글 삭제</div>
        </div>
      )}

      <CommentEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        commentId={commentId}
        initialContent={initialContent}
        refreshComments={refreshComments}
      />
    </div>
  );
};

export default ProductCommentKebabMenu;
