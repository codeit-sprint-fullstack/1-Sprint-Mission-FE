'use client';
import styles from '@shared/components/article/comment/ArticleComment.module.css';
import Input from '../../inputs/Input';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getComment } from '@utils/api/api';
import CommentList from './CommentList';
import { useCommentContentStore } from '@shared/store/article/comment';
import PostButton from '@shared/components/Buttons/CRUDButtons/PostButton';

export function ArticleComment({ commentData, articleId }) {
  const { content, setContent } = useCommentContentStore();
  const [inputValid, setInputValid] = useState(true);
  const {
    data: articleComments = commentData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['articleComments'],
    queryFn: async () => getComment(articleId),
    keepPreviousData: true,
    retry: 3,
    retryDelay: 2000,
  });

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
      <div className={styles['comment-title']}>댓글달기</div>
      <Input
        placeholder={'댓글을 입력해주세요.'}
        type={'textarea'}
        label={'comment'}
        onChange={handleContentOnChange}
      />
      <div className={styles['button-container']}>
        <PostButton
          content={'등록'}
          style={'post-button'}
          type={'comment'}
          disabled={inputValid}
        />
      </div>
      <div className={styles['comment-list-container']}>
        {isLoading ? <>로딩중입니다.</> : null}
        {error ? <>로딩중입니다.</> : null}
        {articleComments && articleComments.length > 0 ? (
          articleComments.map((comment) => {
            return <CommentList comment={comment} />;
          })
        ) : (
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
