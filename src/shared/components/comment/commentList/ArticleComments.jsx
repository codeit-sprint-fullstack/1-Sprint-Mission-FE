'use client';
import { useArticleComments } from 'src/hooks/comment/useArticleComments';
import { Comment } from '@shared/components/comment/Comment';
import CommentInputBox from '@shared/components/comment/CommentInputBox';

export function ArticleComments({ id, initialData }) {
  return (
    <>
      <CommentInputBox title={'댓글등록'} placeholder={'댓글을 입력해주세요'} />
      <Comment
        id={id}
        initialData={initialData}
        useCommentsQuery={useArticleComments}
      />
    </>
  );
}
