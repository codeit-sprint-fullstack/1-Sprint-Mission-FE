import React from 'react';
import { useRouter } from 'next/router';
import styles from './PostItem.module.css';

const PostItem = ({ id, title, author, date, likes, image }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/articles/${id}`);
  };

  const defaultData = {
    title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
    author: '푸바오',
    date: '2024.04.16',
    likes: Math.floor(Math.random() * 10000), 
    image: '/image/default.svg'
  };

  return (
    <div className={styles.postItem} onClick={handleClick}>
      <div className={styles.postContent}>
        <h3 className={styles.postTitle}>{title || defaultData.title}</h3>
        <div className={styles.postDetails}>
          <img src="/image/profile.svg" alt="Profile Icon" className={styles.profileIcon} />
          <span className={styles.author}>{author || defaultData.author}</span>
          <span className={styles.date}>{date || defaultData.date}</span> {/* 날짜 변환 없이 그대로 사용 */}
        </div>
      </div>
      <div className={styles.postImageContainer}>
        <img src={image || defaultData.image} alt="게시글 이미지" className={styles.postImage} />
        <div className={styles.postLikes}>
          <img src="/image/heart.svg" alt="Likes" />
          <span>{likes !== undefined ? likes : defaultData.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

