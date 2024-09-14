import { useState } from 'react';
import { useRouter } from 'next/router';
import ArticleFormFields from '@/utils/ArticleFormFields';
import { postArticle } from '@/utils/api/articleApi.js';

export default function PostArticlePage() {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await postArticle({
        titleValue,
        contentValue,
      });

      router.push(`/article/${res.id}`);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

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
