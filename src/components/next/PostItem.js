import React from 'react';
import { useRouter } from 'next/router';
import styles from './PostItem.module.css';

// 날짜를 YYYY.MM.DD 형식으로 변환하는 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\./g, '.');
};

const PostItem = ({ id = 0, title, author, date, likes, image }) => {
  const router = useRouter();

  // 게시글 클릭 시 호출되는 함수
  const handleClick = () => {
    router.push(`/articles/${id}`); // 해당 게시글의 id를 기반으로 상세 페이지로 이동
  };

  // 테스트용 기본값 객체 설정
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
          <span className={styles.date}>{date ? formatDate(date) : defaultData.date}</span> {/* 날짜 변환 적용 */}
        </div>
      </div>
      <div className={styles.postImageContainer}>
        <img src={image || defaultData.image} alt="게시글 이미지" className={styles.postImage} />
        <div className={styles.postLikes}>
          <img src="/image/heart.svg" alt="Likes" />
          <span>{likes !== undefined ? likes : defaultData.likes}</span> {/* 전달된 좋아요 사용 */}
        </div>
      </div>
    </div>
  );
};

export default PostItem;

