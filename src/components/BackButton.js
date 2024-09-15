import React from 'react';
import { useRouter } from 'next/router';
import styles from './BackButton.module.css';

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/'); // 루트 페이지인 index.js로 이동
  };

  return (
    <button className={styles.backButton} onClick={handleClick}>
      <span className={styles.text}>목록으로 돌아가기</span>
      <img src="/image/back.svg" alt="Back Icon" className={styles.icon} />
    </button>
  );
};

export default BackButton;

