import React, { useState } from 'react';
import styles from './PostKebabMenu.module.css';

const PostKebabMenu = ({ postId, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false); // 메뉴 상태 관리

  const handleKebabClick = () => {
    setShowMenu(!showMenu); // 케밥 버튼 클릭 시 토글
  };

  const handleEditClick = () => {
    // 게시글 수정
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
      {showMenu && ( // showMenu가 true일 때만 메뉴 보여줌
        <div className={styles.kebabMenu}>
          <button className={styles.menuItem} onClick={handleEditClick}>게시글 수정</button>
          <button className={styles.menuItem} onClick={onDelete}>게시글 삭제</button>
        </div>
      )}
    </div>
  );
};

export default PostKebabMenu;

