import ArticleFormFields from '@/utils/ArticleFormFields';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Button from '@/utils/Button';

export default function Post() {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const router = useRouter();

  async function postArticle() {
    try {
      const res = await axios.post(
        'https://sprint-be-k938.onrender.com/articles',
        {
          title: titleValue,
          content: contentValue,
          category: 'freeboard',
          userId: '9cda174e-2e9e-4523-97cd-362e85a39ebf',
        }
      );
      router.push(`/article/${res.data.id}`);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  function handleSubmit() {
    postArticle();
  }

  return (
    <>
      <ArticleFormFields
        title={{
          label: '게시물 등록',
        }}
        button={{
          disabled: !canSubmit,
          label: '등록',
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
