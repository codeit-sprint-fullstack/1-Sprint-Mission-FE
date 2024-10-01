import { useState } from 'react';
import { useRouter } from 'next/router';
import { createArticle } from '../../api/articleApi';
import ImageUpload from '../../components/ImageUpload';
import styles from '../../styles/create.module.css';
import RegisterButton from '../../components/RegisterButton';

const formatDate = (dateString) => {
  return new Date(dateString).toISOString().slice(0, 10).replace(/-/g, '.');
};

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt] = useState(formatDate(new Date()));
  const [imageUrls, setImageUrls] = useState([]);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (!title || !content || imageUrls.length === 0) {
        console.error("제목, 내용 및 이미지를 모두 입력해야 합니다.");
        return;
      }

      const articleData = {
        title: title.trim(),
        content: content.trim(),
        createdAt,
        images: imageUrls,
      };

      console.log("전송할 게시글 데이터:", articleData);

      const result = await createArticle(articleData);

      if (result && result.id) {
        router.push(`/articles/${result.id}`);
      } else {
        console.error("게시글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 등록 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <form className={styles.registrationForm}>
      <div className={styles.formHeader}>
        <h2>게시글 쓰기</h2>
        <RegisterButton
          title={title}
          content={content}
          createdAt={createdAt}
          addNewPost={handleSubmit}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="images">게시글 이미지</label>
        <ImageUpload setImageUrls={setImageUrls} />
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

