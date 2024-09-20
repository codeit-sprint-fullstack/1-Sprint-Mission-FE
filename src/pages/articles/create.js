import { useState } from 'react';
import { useRouter } from 'next/router';
import { createArticle } from '../../api/api';
import styles from '../../styles/create.module.css';
import RegisterButton from '../../components/RegisterButton';

// 날짜를 YYYY.MM.DD 형식으로 변환하는 함수
const formatDate = (dateString) => {
  return new Date(dateString).toISOString().slice(0, 10).replace(/-/g, '.');
};

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt] = useState(formatDate(new Date()));  // 날짜 변환 후 저장
  const router = useRouter();

  const handleNewPost = (newPost) => {
    console.log('New Post Created: ', newPost);
  };

  return (
    <form className={styles.registrationForm}>
      <div className={styles.formHeader}>
        <h2>게시글 쓰기</h2>
        <RegisterButton
          title={title}
          content={content}
          createdAt={createdAt}  // 변환된 날짜 전달
          addNewPost={handleNewPost}
        />
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

