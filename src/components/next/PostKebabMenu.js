import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { deleteArticle } from '../../api/api'; // 게시글 삭제 API 호출
import styles from './PostKebabMenu.module.css';

const PostKebabMenu = ({ postId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter(); 

  const handleKebabClick = () => {
    setShowMenu(!showMenu);
    console.log("케밥 메뉴 클릭됨, 메뉴 상태:", showMenu ? "닫힘" : "열림");
  };

  const handleEditClick = () => {
    console.log("게시글 수정 버튼 클릭됨, 게시글 ID:", postId);
    router.push(`/articles/edit/${postId}`); // 게시글 수정 페이지로 이동
  };

  const handleDeleteClick = async () => {
    console.log("게시글 삭제 버튼 클릭됨, 게시글 ID:", postId);
    try {
      await deleteArticle(postId); // 게시글 삭제 API 호출
      alert('게시글이 삭제되었습니다.');
      console.log("게시글 삭제 성공");
      router.replace('/'); // 삭제 후 index.js로 이동
    } catch (error) {
      console.error('게시글 삭제 중 오류가 발생했습니다:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
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
          <div className={styles.menuItem} onClick={handleEditClick}>게시글 수정</div>
          <div className={styles.menuItem} onClick={handleDeleteClick}>게시글 삭제</div>
        </div>
      )}
    </div>
  );
};

export default PostKebabMenu;

