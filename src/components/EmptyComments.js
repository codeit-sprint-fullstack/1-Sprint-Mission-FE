import React from 'react';
import styles from '../../styles/postdetail.module.css'; // 기존 스타일을 가져옴
import BackButton from './BackButton';

const EmptyComments = () => {
  return (
    <>
      <img src="/image/reply.svg" alt="Reply Icon" className={styles.replyIcon} />
      <p className={styles.noCommentsText}>
        아직 댓글이 없어요, <br /> 지금 댓글을 달아보세요!
      </p>
      <div className={styles.buttonContainer}>
        <BackButton />
      </div>
    </>
  );
};

export default EmptyComments;

