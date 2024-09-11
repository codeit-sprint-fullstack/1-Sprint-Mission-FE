import React from 'react';
import styles from '../styles/post-detail.module.css';

const PostDetail = ({ post }) => {
  // 기본값으로 사용할 게시글 정보 - 테스트용
  const defaultPost = {
    title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
    author: '총명한 판다',
    date: '2024.01.02',
    likes: '9999+',
    content: '이 맥북을 어떻게 팔아야 할지 고민입니다. 적절한 가격을 알고 싶습니다.',
    image: '/image/img_default.svg',
  };

  // post 데이터가 없을 경우 기본값을 사용 - 테스트용
  const displayedPost = post || defaultPost;

  return (
    <div className={styles.postDetailContainer}>
      {/* 제목과 Kebab 아이콘 */}
      <div className={styles.titleContainer}>
        <h1 className={styles.postTitle}>{displayedPost.title}</h1>
        <img src="/image/kebab.svg" alt="Kebab Icon" className={styles.kebabIcon} />
      </div>

      {/* 프로필 및 기타 정보 */}
      <div className={styles.postInfo}>
        <img src="/image/mini_profile.svg" alt="Mini Profile" className={styles.profileIcon} />
        <span className={styles.author}>{displayedPost.author}</span>
        <span className={styles.date}>{displayedPost.date}</span>
        <img src="/image/line.svg" alt="Line" className={styles.lineIcon} />
        <img src="/image/heart.svg" alt="Likes" className={styles.heartIcon} />
        <span className={styles.likes}>{displayedPost.likes}</span>
      </div>

      {/* 게시글 본문 */}
      <div className={styles.contentContainer}>
        <p className={styles.postContent}>{displayedPost.content}</p>
      </div>
    </div>
  );
};

export default PostDetail;

