'use client';
import Input from '@shared/components/inputs/Input';
import styles from '@shared/components/article/CreateArticle.module.css';
import { useEffect, useState } from 'react';
import { usePostArticleStore } from '@shared/store/article/article';
import PostButton from '../Buttons/CRUDButtons/PostButton';

export default function CreateArticle() {
  const { title, content, setTitle, setContent } = usePostArticleStore();
  const [inputValid, setInputValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'content') {
      setContent(value);
    }
  };

  useEffect(() => {
    if (title && content) {
      setInputValid(false);
    } else setInputValid(true);
  }, [title, content]);

  return (
    <div className={styles['container']}>
      <div className={styles['create-header']}>
        <div className={styles['create-title']}>게시글 쓰기</div>
        <PostButton
          content={'등록'}
          style={'post-button'}
          disabled={inputValid}
          type={'article'}
        />
      </div>
      <div className={styles['input-label']}>*제목</div>
      <div className={styles['input-container']}>
        <Input
          name={'title'}
          placeholder={'제목을 입력해주세요'}
          option={'text'}
          page={'create-article-title'}
          onChange={handleChange}
        />
      </div>
      <div className={styles['input-label']}>*내용</div>
      <div className={styles['input-container']}>
        <Input
          name={'content'}
          placeholder={'내용을 입력해주세요'}
          option={'textarea'}
          page={'create-article-content'}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
