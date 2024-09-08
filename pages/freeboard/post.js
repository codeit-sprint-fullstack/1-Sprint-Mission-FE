import styles from '@/styles/Post.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useRouter } from 'next/router';

export default function Post() {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [submit, setSubmit] = useState(false);

  const router = useRouter();

  async function postArticle() {
    try {
      const res = await axios.post(
        'https://sprint-be-h8kw.onrender.com/articles',
        {
          title: titleValue,
          content: contentValue,
          category: 'freeboard',
          userId: '3160c83b-8dcc-4ca2-9d51-717c5246d414',
        }
      );
      console.log(res.data);
      router.push(`/article/${res.data.id}`);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  const titleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const contentChange = (event) => {
    setContentValue(event.target.value);
  };

  useEffect(() => {
    setSubmit(titleValue.trim() !== '' && contentValue.trim() !== '');
  }, [titleValue, contentValue]);

  function handleSubmit() {
    postArticle();
  }

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>게시글 쓰기</span>

          <button
            disabled={!submit}
            className={submit ? styles.submitBtn : styles.btn}
            type='button'
            onClick={handleSubmit}
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
