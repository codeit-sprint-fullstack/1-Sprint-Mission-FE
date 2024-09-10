import Link from 'next/link';
import styles from './PostItem.module.css';

const PostItem = ({ id, title, author, date, likes, image, isDefault = false }) => {
  const randomNickname = '익명의 사용자';  
  const randomLikes = Math.floor(Math.random() * 10000); 

  const postLink = isDefault ? '/post-detail' : `/articles/${id}`;

  return (
    <div className={styles.postItem}>
      <Link href={postLink}>
        <a>
          <div className={styles.postContent}>
            <h3 className={styles.postTitle}>{title || '기본 제목'}</h3>
            <div className={styles.postDetails}>
              <img src="/image/mini_profile.svg" alt="Profile Icon" className={styles.profileIcon} />
              <span className={styles.author}>{author || randomNickname}</span>
              <span className={styles.date}>{date || '2024.04.16'}</span>
            </div>
          </div>
          <div className={styles.postImageContainer}>
            <img src={image || '/image/img_default.svg'} alt="Post Image" className={styles.postImage} />
            <div className={styles.postLikes}>
              <img src="/image/heart.svg" alt="Likes" />
              <span>{likes !== undefined ? likes : randomLikes}</span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default PostItem;

