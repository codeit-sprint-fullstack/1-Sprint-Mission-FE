import React, { useState, useEffect } from 'react';
import styles from './BestPosts.module.css';
import { fetchBestArticles } from '../../api/api'; // api.js에서 fetchBestArticles 함수 가져오기

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

export default BestPosts;

