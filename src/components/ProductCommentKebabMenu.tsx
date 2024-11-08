import React, { useState, useRef, useEffect } from 'react';
import { deleteProductComment } from '../api/commentApi';
import ProductCommentEditModal from './ProductCommentEditModal';
import styles from './ProductCommentKebabMenu.module.css';

interface ProductCommentKebabMenuProps {
  commentId: number;
  productId: number;
  initialContent: string;
  refreshComments: () => void;
  onEdit: () => void;
}

const ProductCommentKebabMenu = ({
  commentId,
  productId,
  initialContent,
  refreshComments,
  onEdit,
}: ProductCommentKebabMenuProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
  };

  const handleDeleteClick = async () => {
    try {
      await deleteProductComment(productId, commentId);
      alert('댓글이 삭제되었습니다.');
      refreshComments();
      setShowMenu(false);
    } catch (error) {
      console.error('댓글 삭제 중 오류가 발생했습니다:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setShowMenu(false);
    onEdit();
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

      <ProductCommentEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        commentId={commentId}
        productId={productId}
        initialContent={initialContent}
        onCommentUpdate={refreshComments}
      />
    </div>
  );
};

export default ProductCommentKebabMenu;

