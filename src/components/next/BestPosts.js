import React, { useState, useEffect } from 'react';
import styles from './BestPosts.module.css';

const BestBox = ({ title, author, likes, date, image }) => {
  return (
    <div className={styles.bestBox}>
      <img src="/image/best.svg" alt="Best Icon" className={styles.bestIcon} />
      <h3 className={styles.bestTitle}>
        {title || '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?'}
      </h3>
      <img src={image || '/image/next_default.svg'} alt="Post Image" className={styles.bestImage} />
      <div className={styles.bestFooter}>
        <span className={styles.bestAuthor}>{author || '총명한판다'}</span>
        <div className={styles.bestLikes}>
          <img src="/image/heart.svg" alt="Heart Icon" />
          <span>{likes || '9999+'}</span>
        </div>
        <span className={styles.bestDate}>{date || '2024.04.16'}</span>
      </div>
    </div>
  );
};

const BestPosts = ({ bestPosts }) => {
  const [columns, setColumns] = useState(null); // 초기 상태 null로 설정

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

  if (columns === null) {
    // 초기 렌더링 시 아무것도 표시하지 않음
    return <div>Loading...</div>; // 로딩 상태
  }

  return (
    <div className={styles.bestPostsContainer}>
      <h2 className="section-title">베스트 게시글</h2>
      <div className={styles.bestPosts} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {bestPosts.length > 0 ? (
          bestPosts.map((post) => (
            <BestBox
              key={post.id}
              title={post.title}
              author={post.author}
              likes={post.likes}
              date={post.createdAt}
              image={post.image}
            />
          ))
        ) : (
          Array.from({ length: 3 }).map((_, index) => <BestBox key={index} />) // 기본 값으로 3개의 박스 렌더링
        )}
      </div>
    </div>
  );
};

// 서버 사이드 렌더링을 통해 베스트 게시글 가져오기
export async function getStaticProps() {
  const apiUrl = 'https://one-sprint-mission-be-rzbk.onrender.com/api'; 

  try {
    const response = await fetch(`${apiUrl}/articles/best`);
    if (!response.ok) {
      throw new Error('Failed to fetch best articles');
    }
    const bestPosts = await response.json();
    return {
      props: { bestPosts },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { bestPosts: [] },
    };
  }
}

export default BestPosts;

