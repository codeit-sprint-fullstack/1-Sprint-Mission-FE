import React, { useState } from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import styles from './CommentList.module.css';

const CommentList = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);

  const addNewComment = (newComment) => {
    setComments([newComment, ...comments]);
    console.log('New Comment Added:', comments);
  };

  return (
    <div className={styles.commentList}>
      <h2 className={styles.commentTitle}>댓글</h2>

      <div className={styles.commentFormContainer}>
        <CommentForm articleId={1} addNewComment={addNewComment} />
      </div>

      <div className={styles.comments}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentItem
              key={index}
              id={comment.id}
              author={comment.author}
              date={comment.createdAt}
              content={comment.content}
            />
          ))
        ) : (
          <p className={styles.noCommentsText}>아직 댓글이 없어요, <br /> 지금 댓글을 달아보세요!</p>
        )}
      </div>
    </div>
  );
};

export default CommentList;

