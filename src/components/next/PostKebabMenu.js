import React, { useState } from 'react';
import styles from './PostKebabMenu.module.css';

const PostKebabMenu = ({ postId, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleKebabClick = () => {
    setShowMenu(!showMenu); // 케밥 버튼 클릭 시 토글
  };

  const handleEditClick = () => {
    // 게시글 수정 동작
    console.log('게시글 수정');
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
          <div className={styles.menuItem} onClick={handleEditClick}>게시글 수정</div>
          <div className={styles.menuItem} onClick={onDelete}>게시글 삭제</div>
        </div>
      )}
    </div>
  );
};

export default PostKebabMenu;
