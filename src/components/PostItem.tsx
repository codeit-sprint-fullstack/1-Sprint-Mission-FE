import React from 'react';
import { useRouter } from 'next/router';
import styles from './PostItem.module.css';
import { ArticleResponse } from '../api/articleApi';

// 날짜를 YYYY.MM.DD 형식으로 변환하는 함수
const formatDate = (dateString: string): string => {
  return new Date(dateString).toISOString().slice(0, 10).replace(/-/g, '.');
};

interface PostItemProps {
  article: ArticleResponse;
}

const PostItem = ({ article }: PostItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/articles/${article.id}`);
  };

  return (
    <div className={styles.postItem} onClick={handleClick}>
      <div className={styles.postContent}>
        <h3 className={styles.postTitle}>{article.title || '판다의 여왕'}</h3>
        <div className={styles.postDetails}>
          <img src="/image/profile.svg" alt="Profile Icon" className={styles.profileIcon} />
          <span className={styles.author}>{article.user.nickname || '아이바오'}</span>
          <span className={styles.date}>{formatDate(article.createdAt)}</span>
        </div>
      </div>
      <div className={styles.postImageContainer}>
        <img src={article.images[0] || '/image/default.svg'} alt="아이바오 이미지" className={styles.postImage} />
        <div className={styles.postLikes}>
          <img src="/image/heart.svg" alt="Likes" />
          <span>{article.likes.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

