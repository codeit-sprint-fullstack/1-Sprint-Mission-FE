import { useState, useEffect } from 'react';
import { updateArticle, fetchArticleById } from '../../../src/api/api'; // API 추가
import styles from '../../../styles/EditArticle.module.css'; // CSS 모듈 파일 적용
import RegisterButton from '../../../src/components/next/RegisterButton';

const EditArticle = ({ articleId }) => {
  const [title, setTitle] = useState('');  
  const [content, setContent] = useState(''); 
  const [createdAt, setCreatedAt] = useState(''); 

  useEffect(() => {
    // 기존 게시글 데이터 불러오기
    fetchArticleById(articleId).then((article) => {
      setTitle(article.title);
      setContent(article.content);
      setCreatedAt(article.createdAt);
    });
  }, [articleId]);

  const handleSavePost = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      await updateArticle(articleId, { title, content });
      alert('게시글이 수정되었습니다.');
    } catch (error) {
      console.error('게시글 수정 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <form className={styles.postDetailContainer}>
      <div className={styles.titleContainer}>
        <h2>게시글 수정하기</h2>
        <RegisterButton
          title={title}
          content={content}
          createdAt={createdAt}
          onClick={handleSavePost}
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

export default EditArticle;
