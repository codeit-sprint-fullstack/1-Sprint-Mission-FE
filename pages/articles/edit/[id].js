import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { updateArticle, fetchArticleById } from '../../../src/api/api';
import styles from '../../../styles/create.module.css'; // 게시글 등록 페이지와 동일한 CSS 파일 적용
import EditButton from '../../../src/components/next/EditButton'; // 새로 만든 EditButton 사용

const EditArticle = () => {
  const router = useRouter();
  const { id: articleId } = router.query; // URL에서 id를 articleId로 가져오기

  const [title, setTitle] = useState('');  
  const [content, setContent] = useState(''); 

  useEffect(() => {
    if (articleId) {
      console.log("게시글 ID 확인:", articleId); // articleId 확인
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
      await updateArticle(articleId, { title, content }); // 게시글 수정 API 호출
      alert('게시글이 수정되었습니다.');
      console.log("게시글 수정 성공, 게시글 ID:", articleId);
      router.replace(`/articles/${articleId}`); // 수정 후 다시 게시글 상세 페이지로 이동
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
          articleId={articleId}  // articleId를 EditButton에 전달
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

