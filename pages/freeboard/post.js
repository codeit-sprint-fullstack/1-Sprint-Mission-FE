import styles from '@/styles/Post.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Post() {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [submit, setSubmit] = useState(false);

  const titleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const contentChange = (event) => {
    setContentValue(event.target.value);
  };

  useEffect(() => {
    setSubmit(titleValue.trim() !== '' && contentValue.trim() !== '');
  }, [titleValue, contentValue]);

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>게시글 쓰기</span>

          {submit ? (
            <button className={styles.submitBtn}>등록</button>
          ) : (
            <button disabled={!submit} className={styles.btn}>
              등록
            </button>
          )}
        </div>

        <div className={styles.name}>제목</div>
        <input
          placeholder='제목을 입력하세요'
          value={titleValue}
          onChange={titleChange}
          id='titleValue'
          className={styles.input}
        />
        <div className={styles.name}>내용</div>
        <textarea
          placeholder='내용을 입력하세요 '
          value={contentValue}
          onChange={contentChange}
          className={styles.textarea}
        />
      </div>
    </>
  );
}
