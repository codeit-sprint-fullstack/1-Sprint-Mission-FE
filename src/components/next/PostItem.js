import React from 'react';
import styles from './PostItem.module.css';

const PostItem = ({ title, author, date, likes, image }) => {
  // 임의의 기본값 설정
  const randomNickname = '익명의 사용자';  // 임의의 닉네임
  const randomLikes = Math.floor(Math.random() * 10000);  // 0에서 9999까지 임의의 좋아요 수

  return (
    <div className={styles.postItem}>
      <div className={styles.postContent}>
        <h3 className={styles.postTitle}>{title || '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?'}</h3>
        <div className={styles.postDetails}>
          <img src="/image/mini_profile.svg" alt="Profile Icon" className={styles.profileIcon} />
          <span className={styles.author}>{author || randomNickname}</span> {/* author가 없으면 임의값 사용 */}
          <span className={styles.date}>{date || '2024.04.16'}</span>
        </div>
      </div>
      <div className={styles.postImageContainer}>
        <img src={image || '/image/default.svg'} alt="게시글 이미지" className={styles.postImage} />
        <div className={styles.postLikes}>
          <img src="/image/heart.svg" alt="Likes" />
          <span>{likes !== undefined ? likes : randomLikes}</span> {/* likes가 없으면 임의값 사용 */}
        </div>
      </div>
    </div>
  );
};

export default PostItem;

