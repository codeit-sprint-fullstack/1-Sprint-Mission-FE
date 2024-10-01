import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { updateArticle, getArticleById } from '../../../api/articleApi';
import styles from '../../../styles/create.module.css';
import EditButton from '../../../components/EditButton';

const EditArticle = () => {
  const router = useRouter();
  const { id: articleId } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (articleId) {
      console.log("게시글 ID 확인:", articleId);
      getArticleById(articleId)
        .then((article) => {
          setTitle(article.title);
          setContent(article.content);
          console.log("게시글 불러오기 성공:", article);
        })
        .catch((error) => {
          console.error('게시글 불러오기 중 오류 발생:', error);
        });
    }
  }, [articleId]);

  const handleSavePost = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      await updateArticle(articleId, { title, content });
      alert('게시글이 수정되었습니다.');
      console.log("게시글 수정 성공, 게시글 ID:", articleId);
      router.replace(`/articles/${articleId}`);
    } catch (error) {
      console.error('게시글 수정 중 오류가 발생했습니다.', error);
      alert('게시글 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <form className={styles.registrationForm}>
      <div className={styles.formHeader}>
        <h2>게시글 수정하기</h2>
        <EditButton
          articleId={articleId}
          title={title}
          content={content}
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

export default EditArticle;

