'use client';
import ActionButton from '@shared/components/Buttons/ActionButton';
import Input from '@shared/components/inputs/Input';
import styles from '@shared/components/article/CreateArticle.module.css';
import { useEffect, useState } from 'react';

export default function CreateArticle() {
  const [inputValue, setInputValue] = useState({ title: '', content: '' });
  const [inputValid, setInputValid] = useState(true);

  const handleTitleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleContentOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  useEffect(() => {
    if (inputValue.title && inputValue.content) {
      setInputValid(false);
    } else setInputValid(true);
  }, [inputValue]);

  return (
    <div className={styles['container']}>
      <div className={styles['create-header']}>
        <div className={styles['create-title']}>게시글 쓰기</div>
        <ActionButton content={'등록'} type={'post'} disabled={inputValid} />
      </div>
      <div className={styles['input-label']}>*제목</div>
      <div className={styles['input-container']}>
        <Input
          placeholder={'제목을 입력해주세요'}
          type={'text'}
          label={'title'}
          onChange={handleTitleOnChange}
        />
      </div>
      <div className={styles['input-label']}>*내용</div>
      <div className={styles['input-container']}>
        <Input
          placeholder={'내용을 입력해주세요'}
          type={'textarea'}
          label={'content'}
          onChange={handleContentOnChange}
        />
      </div>
    </div>
  );
}
