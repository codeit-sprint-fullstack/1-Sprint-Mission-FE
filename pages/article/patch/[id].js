import styles from '@/styles/Post.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import data from '@/lib/mock.js';

export default function Post() {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [submit, setSubmit] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const titleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const contentChange = (event) => {
    setContentValue(event.target.value);
  };

  useEffect(() => {
    setSubmit(titleValue.trim() !== '' && contentValue.trim() !== '');
  }, [titleValue, contentValue]);

  useEffect(() => {
    if (!id) return;
    const nextArticle = data.find((article) => article.id === id);
    setTitleValue(nextArticle.title);
    setContentValue(nextArticle.content);
  }, [id]);

  const handleSubmit = () => {
    // 여기에 실제 데이터 제출 로직을 추가하세요.
    // 예를 들어, API 호출을 통해 수정된 데이터를 서버에 제출하는 작업 등을 추가합니다.
    router.push(`/article/${id}`); // 제출 후 페이지 이동
  };

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>수정하기</span>
          <button
            onClick={handleSubmit}
            disabled={!submit}
            className={submit ? styles.submitBtn : styles.btn}
          >
            등록
          </button>
        </div>

        <div className={styles.name}>제목</div>
        <input
          placeholder='제목을 입력하세요'
          value={titleValue}
          onChange={titleChange}
          id='titleValue'
          className={styles.input}
        ></input>
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
