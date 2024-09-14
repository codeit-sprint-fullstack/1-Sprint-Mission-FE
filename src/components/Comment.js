import { useState } from "react";
import styles from "@styles/Comment.module.css";
import KebabDropdown from "./KebabDropdown";
import Image from "next/image";

import profileImage from "@images/ic_profile.svg";

const Comment = ({ comment, onDelete, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSaveEdit = () => {
    onEdit(comment.id, editContent);
    setIsEdit(false);
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEdit(false);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        {isEdit ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={styles.editArea}
          />
        ) : (
          <span className={`${styles.commentContent} text-md regular`}>
            {comment.content}
          </span>
        )}

        <KebabDropdown onDelete={onDelete} onEdit={handleEdit} />
      </div>
      {isEdit && (
        <div className={styles.editActions}>
          <button onClick={handleSaveEdit} className={styles.saveButton}>
            저장
          </button>
          <button onClick={handleCancelEdit} className={styles.cancelButton}>
            취소
          </button>
        </div>
      )}
      <div className={styles.commentInfo}>
        <Image src={profileImage} alt="profile image" width={32} height={32} />
        <div className={styles.infoContent}>
          <span className={`${styles.commentNickname} text-xs regular`}>
            힘쎈 판다
          </span>
          <span className={`${styles.commentTime} text-xs regular`}>
            {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
