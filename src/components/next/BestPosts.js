import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './BestPosts.module.css';
import { fetchBestArticles } from '../../api/api';

// 날짜를 YYYY.MM.DD 형식으로 변환하는 함수
const formatDate = (dateString) => {
  return new Date(dateString).toISOString().slice(0, 10).replace(/-/g, '.');
};

const BestBox = ({ id, title, author, likes, date, image }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/articles/${id}`);
  };

  return (
    <div className={styles.bestBox} onClick={handleClick}>
      <img src="/image/best.svg" alt="Best Icon" className={styles.bestIcon} />
      <h3 className={styles.bestTitle}>
        {title || '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?'}
      </h3>
      <img src={image || '/image/next_default.svg'} alt="Post Image" className={styles.bestImage} />
      <div className={styles.bestFooter}>
        <span className={styles.bestAuthor}>{author || '푸바오'}</span>
        <div className={styles.bestLikes}>
          <img src="/image/heart.svg" alt="Heart Icon" />
          <span>{likes || '0'}</span>
        </div>
        <span className={styles.bestDate}>{formatDate(date)}</span> {/* 변환된 날짜 출력 */}
      </div>
    </div>
  );
};

const BestPosts = ({ bestPosts }) => {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 744) {
        setColumns(1); 
      } else if (width >= 744 && width < 1200) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    if (typeof window !== 'undefined') {
      handleResize(); // 초기 렌더링 시 크기 확인
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  if (!Array.isArray(bestPosts) || bestPosts.length === 0) {
    return <div className={styles.noPostsMessage}>베스트 게시글이 없습니다.</div>;
  }

  return (
    <div className={styles.bestPostsContainer}>
      <h2 className="section-title">베스트 게시글</h2>
      <div className={styles.bestPosts} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {bestPosts.map((post) => (
          <BestBox
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.author}
            likes={post.likes}
            date={post.createdAt}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
};

export default BestPosts;

