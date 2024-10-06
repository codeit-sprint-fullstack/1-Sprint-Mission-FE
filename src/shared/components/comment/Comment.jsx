'use client';
import styles from '@shared/components/comment/Comment.module.css';
import Image from 'next/image';
import CommentTemplate from './CommentTemplate';

export function Comment({ initialData, id, useCommentsQuery, content }) {
  const {
    data: comments,
    isLoading,
    error,
  } = useCommentsQuery({
    id,
    initialData,
  });

  return (
    <>
      <div className={styles['comment-list-container']}>
        {isLoading ? <>로딩중입니다.</> : null}
        {error ? <>로딩중입니다.</> : null}
        {comments && comments.length > 0 ? (
          comments.map((comment) => {
            return <CommentTemplate comment={comment} />;
          })
        ) : (
          <div className={styles['not-found-comment-container']}>
            <div className={styles['not-found-comment-image']}>
              <Image src={'/not-found-comment.svg'} fill />
            </div>
            <div className={styles['not-found-content']}>{content}</div>
          </div>
        )}
      </div>
    </>
  );
}
