import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchArticleById, updateArticle } from '../../src/api/api'; // api.js에서 함수 가져오기

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          // api.js의 fetchArticleById 함수 사용
          const data = await fetchArticleById(id);
          setTitle(data.title);
          setContent(data.content);
        } catch (error) {
          console.error('Failed to fetch article:', error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // api.js의 updateArticle 함수 사용
      await updateArticle(id, { title, content });
      router.push(`/articles/${id}`);
    } catch (error) {
      console.error('Failed to update article:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      />
      <button type="submit" disabled={!title || !content}>
        수정
      </button>
    </form>
  );
};

export default EditArticle;
