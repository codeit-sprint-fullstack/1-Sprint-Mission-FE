import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 환경 변수 사용
        const response = await fetch(`${apiUrl}/articles/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
        } else {
          console.error('Failed to fetch article');
        }
      };

      fetchArticle();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 환경 변수 사용
    const response = await fetch(`${apiUrl}/articles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      router.push(`/articles/${id}`);
    } else {
      console.error('Failed to update article');
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

