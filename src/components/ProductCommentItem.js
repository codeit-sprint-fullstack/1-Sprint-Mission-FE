import React, { useState } from "react";
import { formatDate } from "../utils/formatDate";
import ProductCommentKebabMenu from "./ProductCommentKebabMenu";
import CommentEditModal from "./CommentEditModal";
import styles from "./ProductCommentItem.module.css";

const ProductCommentItem = ({
  id,
  content,
  createdAt,
  author,
  refreshComments,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const displayDate = formatDate(createdAt);

  const handleCommentUpdate = (newContent) => {
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
        initialContent={editedContent}
        refreshComments={refreshComments}
        onEdit={() => setIsEditModalOpen(true)}
      />

      <CommentEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        commentId={id}
        initialContent={editedContent}
        onCommentUpdate={handleCommentUpdate}
      />
    </div>
  );
};

export default ProductCommentItem;
