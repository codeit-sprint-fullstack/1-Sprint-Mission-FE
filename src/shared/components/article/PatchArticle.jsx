'use client';
import Input from '@shared/components/inputs/Input';
import styles from '@shared/components/article/CreateArticle.module.css';
import { useEffect, useState } from 'react';
import { usePatchArticleStore } from '@shared/store/article/article';
import PatchButton from '../Buttons/CRUDButtons/PatchButton';

export default function PatchArticle() {
  const { title, content, setTitle, setContent } = usePatchArticleStore();
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
        <div className={styles['create-title']}>게시글 수정</div>
        <PatchButton
          content={'수정'}
          style={'patch-button'}
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
          page={'patch-article-title'}
          onChange={handleChange}
        />
      </div>
      <div className={styles['input-label']}>*내용</div>
      <div className={styles['input-container']}>
        <Input
          name={'content'}
          placeholder={'내용을 입력해주세요'}
          option={'textarea'}
          page={'patch-article-content'}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
