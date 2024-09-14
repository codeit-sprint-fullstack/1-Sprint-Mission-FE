import { useState } from 'react';
import { useRouter } from 'next/router';
import ArticleFormFields from '@/utils/ArticleFormFields';

import { fetchArticle, editArticle } from '@/utils/api/articleApi.js';

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const article = await fetchArticle(id);
    return {
      props: { article },
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return {
      notFound: true,
    };
  }
}

export default function EditArticlePage({ article }) {
  const [titleValue, setTitleValue] = useState(article.title);
  const [contentValue, setContentValue] = useState(article.content);
  const [canSubmit, setCanSubmit] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async () => {
    try {
      const res = await editArticle(titleValue, contentValue, id);
      const nextArticle = res;
      setTitleValue(nextArticle.title);
      setContentValue(nextArticle.content);
      router.push(`/article/${id}`); // 페이지 이동
    } catch (error) {
      console.error('Error editing article:', error);
    }
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
