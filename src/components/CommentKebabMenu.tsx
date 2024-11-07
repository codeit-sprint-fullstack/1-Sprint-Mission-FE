import React, { useState } from "react";
import { deleteArticleComment } from "../api/commentApi";
import styles from "./CommentKebabMenu.module.css";

interface CommentKebabMenuProps {
  commentId: number;
  articleId: number;
  onEdit: () => void;
  refreshComments: () => void;
}

const CommentKebabMenu: React.FC<CommentKebabMenuProps> = ({
  commentId,
  articleId,
  onEdit,
  refreshComments,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  console.log("전달된 댓글 ID:", commentId);

  const handleKebabClick = () => {
    setShowMenu(!showMenu);
    console.log("케밥 메뉴 버튼 클릭됨, 메뉴 상태:", showMenu ? "닫힘" : "열림");
  };

  // 댓글 삭제 처리
  const handleDeleteClick = async () => {
    console.log("댓글 삭제 버튼 클릭됨, 댓글 ID:", commentId);
    try {
      await deleteArticleComment(articleId, commentId);
      alert("댓글이 삭제되었습니다.");
      console.log("댓글 삭제 성공");
      refreshComments();
      setShowMenu(false);
    } catch (error) {
      console.error("댓글 삭제 중 오류가 발생했습니다:", error);
      alert("댓글 삭제 중 오류가 발생했습니다.");
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
          <div className={styles.menuItem} onClick={onEdit}>
            댓글 수정
          </div>
          <div className={styles.menuItem} onClick={handleDeleteClick}>
            댓글 삭제
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentKebabMenu;
