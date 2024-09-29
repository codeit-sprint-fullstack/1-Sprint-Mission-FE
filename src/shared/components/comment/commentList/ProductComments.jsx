'use client';
import { useArticleComments } from 'src/hooks/comment/useArticleComments';
import { Comment } from '@shared/components/comment/Comment';
import CommentInputBox from '@shared/components/comment/CommentInputBox';

export function ProductComments({ id, initialData }) {
  return (
    <>
      <CommentInputBox
        title={'문의하기'}
        placeholder={
          '개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
        }
      />
      <Comment
        id={id}
        initialData={initialData}
        useCommentsQuery={useArticleComments}
        content={'아직 문의가 없어요'}
      />
    </>
  );
}
