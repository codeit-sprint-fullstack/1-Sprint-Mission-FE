import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/create.module.css';

const BASE_URL = 'https://one-sprint-mission-be-rzbk.onrender.com/api';

const createArticle = async (articleData) => {
  try {
    const response = await axios.post(`${BASE_URL}/articles`, articleData);
    return response.data;
  } catch (error) {
    console.error('게시글 등록 실패:', error);
    throw error;
  }
};

const CreateArticle = ({ onNewPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPost = await createArticle({ title, content });
      onNewPost(newPost); // 새 게시글을 게시글 전체 페이지에 전달
      router.push(`/articles/${newPost.id}`);
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
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content">*내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요"
        />
      </div>
    </form>
  );
};

export default CreateArticle;

