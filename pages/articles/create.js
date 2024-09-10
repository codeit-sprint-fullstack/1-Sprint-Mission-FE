import { useState } from 'react';
import { useRouter } from 'next/router';
import { createArticle } from '../../src/api/api';
import styles from '../../styles/create.module.css';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // createArticle 함수 호출로 API 요청
      const article = await createArticle({ title, content });
      // 게시글이 생성되면 상세 페이지로 이동
      router.push(`/articles/${article.id}`);
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registrationForm}>
      <div className={styles.formHeader}>
        <h2>게시글 쓰기</h2>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!title || !content}
        >
          등록
        </button>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="title">*제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          style={{ height: '30px' }}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content">*내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요"
          style={{ height: '252px' }}
        />
      </div>
    </form>
  );
};

export default CreateArticle;

