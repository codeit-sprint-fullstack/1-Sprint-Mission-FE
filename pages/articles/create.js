import { useState } from 'react';
import { useRouter } from 'next/router';
import { createArticle } from '../../src/api/api';
import styles from '../../styles/create.module.css';
import RegisterButton from '../../src/components/next/RegisterButton'; 

const CreateArticle = () => {
  const [title, setTitle] = useState('');  
  const [content, setContent] = useState(''); 
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

