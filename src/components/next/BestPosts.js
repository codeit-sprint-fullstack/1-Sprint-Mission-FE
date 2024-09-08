import React from 'react';
import styles from './BestPosts.module.css';

const BestBox = ({ title, author, likes, date, image }) => {
  return (
    <div className={styles.bestBox}> {/* CSS 모듈 사용 */}
      <img src="/image/best.svg" alt="Best Icon" className={styles.bestIcon} />
      <h3 className={styles.bestTitle}>
        {title || '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?'}
      </h3>
      <img src={image || '/image/img_default.svg'} alt="Post Image" className={styles.bestImage} />
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
  return (
    <div className={styles.bestPostsContainer}> {/* 컨테이너 */}
      <h2 className="section-title">베스트 게시글</h2> {/* 베스트 게시글 제목 추가 */}
      <div className={styles.bestPosts}>
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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 환경 변수 사용

  try {
    const response = await fetch(`${apiUrl}/articles/best`);
    if (!response.ok) {
      throw new Error('Failed to fetch best articles');
    }
    const bestPosts = await response.json();
    return {
      props: { bestPosts }, // props로 전달
    };
  } catch (error) {
    console.error(error);
    return {
      props: { bestPosts: [] }, // 에러 발생 시 빈 배열 전달
    };
  }
}

export default BestPosts;

