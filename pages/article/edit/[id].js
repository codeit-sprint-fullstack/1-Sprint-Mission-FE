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
      <ArticleFormFields
        title={{
          label: '게시물 수정',
        }}
        button={{
          disabled: !canSubmit,
          label: '수정',
          onClick: handleSubmit,
          setCanSubmit: setCanSubmit,
        }}
        content={{
          titleValue: titleValue,
          setTitleValue: setTitleValue,
          contentValue: contentValue,
          setContentValue: setContentValue,
        }}
      />
    </>
  );
}
