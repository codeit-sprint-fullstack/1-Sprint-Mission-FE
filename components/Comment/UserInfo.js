import styles from '@/styles/Comment.module.css';
import Image from 'next/image';
import profileIcon from '@/public/ic_profile.png';

function DateFormat({ createDate }) {
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

export function UserInfo({ comment }) {
  return (
    <>
      <div className={styles.profile}>
        <Image src={profileIcon} alt='프로필 사진' width={32} height={32} />
        <div className={styles.name}>
          <span className={styles.userName}>{comment.user.nickname}</span>
          <span className={styles.createdDate}>
            <DateFormat createDate={comment} />
          </span>
        </div>
      </div>
    </>
  );
}
