import styles from '@/styles/Post.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ArticleFormFields from '@/utils/ArticleFormFields';
import Button from '@/utils/Button';
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

  useEffect(() => {
    if (!id) return;
    getArticle(id);
  }, [id]);

  const handleSubmit = async () => {
    await patchArticle(id);
    router.push(`/article/${id}`); // 페이지 이동
  };

  return (
    <>
      <div className={styles.postLayout}>
        <div className={styles.header}>
          <span className={styles.title}>수정하기</span>
          <Button disabled={!canSubmit} label='등록' onClick={handleSubmit} />
        </div>
        <ArticleFormFields
          titleValue={titleValue}
          setTitleValue={setTitleValue}
          contentValue={contentValue}
          setContentValue={setContentValue}
          setCanSubmit={setCanSubmit}
        />
      </div>
    </>
  );
}
