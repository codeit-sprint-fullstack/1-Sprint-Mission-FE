'use client';
import styles from '@shared/components/article/ArticleComment.module.css';
import Input from '../inputs/Input';
import ActionButton from '../Buttons/ActionButton';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function ArticleComment() {
  const [inputValue, setInputValue] = useState({ content: '' });
  const [inputValid, setInputValid] = useState(true);

  const handleContentOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  useEffect(() => {
    if (inputValue.content) {
      setInputValid(false);
    } else setInputValid(true);
  }, [inputValue]);

  const commentList = false;

  return (
    <>
      <div className={styles['comment-title']}>댓글달기</div>
      <Input
        placeholder={'댓글을 입력해주세요.'}
        type={'textarea'}
        label={'comment'}
        onChange={handleContentOnChange}
      />
      <div className={styles['button-container']}>
        <ActionButton content={'등록'} type={'post'} disabled={inputValid} />
      </div>
      <div className={styles['comment-list-container']}>
        {commentList ? null : (
          <div className={styles['not-found-comment-container']}>
            <div className={styles['not-found-comment-image']}>
              <Image src={'/not-found-comment.svg'} fill />
            </div>
            <div className={styles['not-found-content']}>
              아직 댓글이 없어요,
              <br />
              지금 댓글을 달아보세요!
            </div>
          </div>
        )}
      </div>
    </>
  );
}
