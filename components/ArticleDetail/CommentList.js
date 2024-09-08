import dotIcon from '@/public/ic_dot.png';
import profileIcon from '@/public/ic_profile.png';
import noComment from '@/public/no_comment.png';
import Image from 'next/image';
import styles from '@/styles/Comment.module.css';

function CreateDate({ createDate }) {
  const createdDate = new Date(createDate.createdAt);
  const nowDate = new Date();

  const timeDiff = nowDate - createdDate;

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor(timeDiff / (1000 * 60));

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return `방금 전`;
}

export default function CommentList({ comments }) {
  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <div className={styles.comments}>
              <div className={styles.commentText}>
                <span>{comment.content}</span>
                <Image src={dotIcon} alt='수정삭제 버튼' />
              </div>
              <div className={styles.profile}>
                <Image
                  src={profileIcon}
                  alt='프로필 사진'
                  width={32}
                  height={32}
                />
                <div className={styles.name}>
                  <span className={styles.userName}>{comment.user.name}</span>
                  <span className={styles.createdDate}>
                    <CreateDate createDate={comment} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Image
          src={noComment}
          alt='댓글이 없습니다'
          className={styles.noComment}
          priority
        />
      )}
    </>
  );
}
