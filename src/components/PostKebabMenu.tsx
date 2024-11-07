import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { deleteArticle } from '../api/articleApi';
import styles from './PostKebabMenu.module.css';

interface PostKebabMenuProps {
  postId: number;
}

const PostKebabMenu: React.FC<PostKebabMenuProps> = ({ postId }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  const handleKebabClick = () => {
    setShowMenu(!showMenu);
    console.log("케밥 메뉴 클릭됨, 메뉴 상태:", showMenu ? "닫힘" : "열림");
  };

  const handleEditClick = () => {
    console.log("게시글 수정 버튼 클릭됨, 게시글 ID:", postId);
    router.push(`/articles/edit/${postId}`);
  };

  const handleDeleteClick = async () => {
    console.log("게시글 삭제 버튼 클릭됨, 게시글 ID:", postId);
    try {
      await deleteArticle(postId);
      alert('게시글이 삭제되었습니다.');
      console.log("게시글 삭제 성공");
      router.replace('/');
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

