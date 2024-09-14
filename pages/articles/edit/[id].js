import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { updateArticle, fetchArticleById } from '../../../src/api/api'; 
import styles from '../../../styles/EditArticle.module.css'; 
import RegisterButton from '../../../src/components/next/RegisterButton';

const EditArticle = () => {
  const router = useRouter();
  const { articleId } = router.query; // URL에서 articleId를 가져옴

  const [title, setTitle] = useState('');  
  const [content, setContent] = useState(''); 

  useEffect(() => {
    if (articleId) {
      // 기존 게시글 데이터 불러오기
      fetchArticleById(articleId)
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
      router.replace(`/articles/${articleId}`); // 수정 후 다시 게시글 상세 페이지로 이동
    } catch (error) {
      console.error('게시글 수정 중 오류가 발생했습니다:', error);
      alert('게시글 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <form className={styles.postDetailContainer}>
      <div className={styles.titleContainer}>
        <h2>게시글 수정하기</h2>
        <RegisterButton
          title={title}
          content={content}
          onClick={handleSavePost} // 수정 버튼 클릭 시 저장 처리
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

