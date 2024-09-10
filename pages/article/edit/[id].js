import styles from '@/styles/Post.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Post() {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [canSubmit, setCanSubmit] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  async function getArticle(targetId) {
    try {
      const res = await axios.get(
        `https://sprint-be-h8kw.onrender.com/articles/${targetId}`
      );
      const nextArticle = res.data;
      setTitleValue(nextArticle.title);
      setContentValue(nextArticle.content);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  async function patchArticle(targetId) {
    try {
      const res = await axios.patch(
        `https://sprint-be-h8kw.onrender.com/articles/${targetId}`,
        {
          title: titleValue,
          content: contentValue,
        }
      );
      const nextArticle = res.data;
      setTitleValue(nextArticle.title);
      setContentValue(nextArticle.content);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  const titleChange = (event) => {
    const value = event.target.value;
    setTitleValue(value);
    setCanSubmit(value.trim() !== '' && contentValue.trim() !== '');
  };
  const contentChange = (event) => {
    const value = event.target.value;
    setContentValue(value);
    setCanSubmit(value.trim() !== '' && titleValue.trim() !== '');
  };

  useEffect(() => {
    if (!id) return;
    getArticle(id);
  }, [id]);

  const handleSubmit = () => {
    patchArticle(id);
    router.push(`/article/${id}`); // 제출 후 페이지 이동
  };

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>수정하기</span>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={canSubmit ? styles.submitBtn : styles.btn}
          >
            등록
          </button>
        </div>

        <div className={styles.name}>제목</div>
        <input
          placeholder='제목을 입력하세요'
          value={titleValue}
          onChange={titleChange}
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
