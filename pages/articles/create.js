import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 환경 변수 사용
    const response = await fetch(`${apiUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      const article = await response.json();
      router.push(`/articles/${article.id}`);
    } else {
      console.error('Failed to create article');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" disabled={!title || !content}>등록</button>
    </form>
  );
};

export default CreateArticle;

