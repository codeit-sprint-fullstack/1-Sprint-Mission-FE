import React, { useState, useEffect } from 'react';
import styles from './BestPosts.module.css';
import { fetchBestArticles } from '../../api/api';

// 개별 베스트 게시글을 나타내는 컴포넌트
const BestBox = ({ title, author, likes, date, image }) => {
  return (
    <div className={styles.bestBox}>
      <img src="/image/best.svg" alt="Best Icon" className={styles.bestIcon} />
      <h3 className={styles.bestTitle}>
        {title || '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?'}
      </h3>
      <img src={image || '/image/next_default.svg'} alt="Post Image" className={styles.bestImage} />
      <div className={styles.bestFooter}>
        <span className={styles.bestAuthor}>{author || '푸바오'}</span>
        <div className={styles.bestLikes}>
          <img src="/image/heart.svg" alt="Heart Icon" />
          <span>{likes || '0'}</span> {/* 전달된 좋아요 사용 */}
        </div>
        <span className={styles.bestDate}>{date || '2024.04.16'}</span>
      </div>
    </div>
  );
};

// 베스트 게시글 목록을 나타내는 컴포넌트
const BestPosts = ({ bestPosts }) => {
  const [columns, setColumns] = useState(null); // 그리드 컬럼 수 상태

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 744) {
        setColumns(1); // 모바일
      } else if (width >= 744 && width < 1200) {
        setColumns(2); // 태블릿
      } else {
        setColumns(3); // 데스크탑
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

  // 베스트 게시글 데이터가 없을 경우 처리
  if (!Array.isArray(bestPosts) || bestPosts.length === 0) {
    return <div>베스트 게시글이 없습니다.</div>;
  }

  return (
    <div className={styles.bestPostsContainer}>
      <h2 className="section-title">베스트 게시글</h2>
      <div className={styles.bestPosts} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {bestPosts.map((post) => (
          <BestBox
            key={post.id}
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

