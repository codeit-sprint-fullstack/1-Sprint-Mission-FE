import React from 'react';
import { useRouter } from 'next/router';
import styles from './PostItem.module.css';

// 날짜를 YYYY.MM.DD 형식으로 변환하는 함수
const formatDate = (dateString) => {
  return new Date(dateString).toISOString().slice(0, 10).replace(/-/g, '.');
};

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
          <span className={styles.date}>{formatDate(date || defaultData.date)}</span> {/* 변환된 날짜 출력 */}
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

