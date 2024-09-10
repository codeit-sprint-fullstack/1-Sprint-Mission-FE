import React from 'react';
import styles from '../styles/post-detail.module.css'; // CSS 모듈 import

const PostDetail = () => {
  // 기본값으로 사용할 게시글 정보
  const defaultPost = {
    title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
    author: '총명한 판다',
    date: '2024.04.16',
    likes: '9999+',
    content: '이 맥북을 어떻게 팔아야 할지 고민입니다. 적절한 가격을 알고 싶습니다.',
    image: '/image/img_default.svg',
  };

  return (
    <div className={styles.postDetailContainer}>
      <h1 className={styles.postTitle}>{defaultPost.title}</h1>
      <img
        src={defaultPost.image}
        alt="Default Post Image"
        className={styles.postImage}
      />
      <div className={styles.postInfo}>
        <p className={styles.postAuthor}>작성자: {defaultPost.author}</p>
        <p className={styles.postDate}>작성일: {defaultPost.date}</p>
        <p className={styles.postLikes}>좋아요: {defaultPost.likes}</p>
      </div>
      <p className={styles.postContent}>{defaultPost.content}</p>
    </div>
  );
};

export default PostDetail;
