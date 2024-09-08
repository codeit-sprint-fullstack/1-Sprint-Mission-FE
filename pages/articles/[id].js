import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ArticleDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 환경 변수 사용
        const response = await fetch(`${apiUrl}/articles/${id}`);
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
        } else {
          console.error('Failed to fetch article');
        }
      };

      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p>{article.author}</p>
    </div>
  );
};

export default ArticleDetail;

