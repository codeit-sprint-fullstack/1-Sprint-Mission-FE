// components/CommentOptions.js

import React, { useState } from "react";
import Image from "next/image";
import styles from "./CommentOptions.module.css";

const CommentOptions = ({ comments, onEdit, onDelete }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  const handleSaveClick = (commentId) => {
    onEdit(commentId, editedContent);
    setEditingCommentId(null);
  };

  const handleCancelClick = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  const [showOptions, setShowOptions] = useState(null);

  const handleCommentOptions = (commentId) => {
    setShowOptions((prev) => (prev === commentId ? null : commentId));
  };

  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.profileImageContainer}>
            <Image
              src="/ic_profile.png"
              alt="프로필"
              width={40}
              height={40}
              className={styles.profileImage}
            />
          </div>
          <div className={styles.commentContentWrapper}>
            {editingCommentId === comment.id ? (
              // 인라인 편집 폼
              <div className={styles.editForm}>
                <textarea
                  className={styles.editTextarea}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className={styles.editActions}>
                  <button onClick={() => handleSaveClick(comment.id)}>
                    저장
                  </button>
                  <button onClick={handleCancelClick}>취소</button>
                </div>
              </div>
            ) : (
              // 댓글 내용 표시
              <>
                <p className={styles.commentContent}>{comment.content}</p>
                <p className={styles.commentMeta}>
                  {comment.writer.nickname} -{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                  <div className={styles.commentActions}>
                    <button
                      onClick={() => handleCommentOptions(comment.id)}
                      className={styles.commentOptionsButton}
                    >
                      <Image
                        src="/ic_kebab.png"
                        alt="옵션"
                        width={20}
                        height={20}
                      />
                    </button>
                    {showOptions === comment.id && (
                      <div className={styles.optionsPopup}>
                        <button onClick={() => handleEditClick(comment)}>
                          수정하기
                        </button>
                        <button onClick={() => onDelete(comment.id)}>
                          삭제하기
                        </button>
                      </div>
                    )}
                  </div>
                </p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentOptions;
