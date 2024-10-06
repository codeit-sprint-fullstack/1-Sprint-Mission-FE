'use client';
import Input from '@shared/components/inputs/Input';
import styles from '@shared/components/comment/CommentInputBox.module.css';
import { useState, useEffect } from 'react';
import { useCommentContentStore } from '@shared/store/article/comment';
import PostButton from '@shared/components/Buttons/CRUDButtons/PostButton';

export default function CommentInputBox({ title }, ...props) {
  const [inputValid, setInputValid] = useState(true);
  const { content, setContent } = useCommentContentStore();

  const handleContentOnChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (content) {
      setInputValid(false);
    } else setInputValid(true);
  }, [content]);

  return (
    <>
      <div className={styles['comment-title']}>{title}</div>
      <Input
        option={'textarea'}
        page={'create-comment-content'}
        onChange={handleContentOnChange}
        {...props}
      />
      <div className={styles['button-container']}>
        <PostButton
          content={'등록'}
          style={'post-button'}
          type={'comment'}
          disabled={inputValid}
        />
      </div>
    </>
  );
}
