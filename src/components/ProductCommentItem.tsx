import React, { useState } from 'react';
import { formatDate } from '../utils/formatDate';
import ProductCommentKebabMenu from './ProductCommentKebabMenu';
import ProductCommentEditModal from './ProductCommentEditModal';
import styles from './ProductCommentItem.module.css';

interface ProductCommentItemProps {
  id: number;
  content: string;
  createdAt: string;
  author: string;
  refreshComments: () => void;
  productId: number;
}

const ProductCommentItem = ({
  id,
  content,
  createdAt,
  author,
  refreshComments,
  productId,
}: ProductCommentItemProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const displayDate = formatDate(createdAt);

  const handleCommentUpdate = (newContent: string) => {
    setEditedContent(newContent);
  };

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentContent}>
        <p>{editedContent}</p>
        <div className={styles.commentDetails}>
          <img
            src="/image/profile.svg"
            alt="Profile Icon"
            className={styles.profileIcon}
          />
          <span className={styles.author}>{author}</span>
          <span className={styles.date}>{displayDate}</span>
        </div>
      </div>

      <ProductCommentKebabMenu
        commentId={id}
        productId={productId}
        initialContent={editedContent}
        refreshComments={refreshComments}
        onEdit={() => setIsEditModalOpen(true)}
      />

      <ProductCommentEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        commentId={id}
        productId={productId}
        initialContent={editedContent}
        onCommentUpdate={handleCommentUpdate}
      />
    </div>
  );
};

export default ProductCommentItem;
