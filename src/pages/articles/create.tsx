import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createArticle, uploadArticleImage } from '../../api/articleApi';
import { getAccessToken } from '../../api/authApi';
import ImageUpload from '../../components/ImageUpload';
import styles from '../../styles/create.module.css';
import RegisterButton from '../../components/RegisterButton';
import { ArticleData } from '../../api/articleApi';

const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10).replace(/-/g, '.');
};

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt] = useState<string>(formatDate(new Date()));
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    console.log("가져온 토큰:", token);
    setAccessToken(token);
  }, []);

  const validateArticle = (title: string, content: string, imageUrls: string[]) => {
    if (!title.trim()) {
      console.error("제목을 입력해주세요.");
      return false;
    }
    if (!content.trim()) {
      console.error("내용을 입력해주세요.");
      return false;
    }
    if (imageUrls.length === 0) {
      console.error("이미지를 최소 하나 이상 업로드해주세요.");
      return false;
    }
    if (imageUrls.length > 3) {
      console.error("이미지는 최대 3개까지만 업로드할 수 있습니다.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateArticle(title, content, imageUrls)) {
      return;
    }

    try {
      const articleData: ArticleData = {
        title: title.trim(),
        content: content.trim(),
        images: imageUrls,
        tags,
      };

      console.log("전송할 데이터:", articleData);

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

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag.trim().length > 0 && tag.trim().length <= 5) {
      e.preventDefault();
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  const handleDeleteTag = (deleteTag: string) => {
    setTags(tags.filter((t) => t !== deleteTag));
  };

  return (
    <form className={styles.registrationForm}>
      <div className={styles.formHeader}>
        <h2>게시글 쓰기</h2>
        <RegisterButton
          title={title}
          content={content}
          addNewPost={handleSubmit}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="images">게시글 이미지</label>
        <ImageUpload
          setImageUrls={setImageUrls}
          imageUrls={imageUrls}
          uploadApi={uploadArticleImage}
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

      <div className={styles.formGroup}>
        <label htmlFor="tag">태그</label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={handleTagKeyPress}
          placeholder="태그를 입력 후 Enter를 누르세요"
        />
        <div className={styles.tags}>
          {tags.map((t, index) => (
            <div key={index} className={styles.tag}>
              <span>#{t}</span>
              <button type="button" onClick={() => handleDeleteTag(t)}>
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default CreateArticle;

