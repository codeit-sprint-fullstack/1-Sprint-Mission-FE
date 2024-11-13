import Comment from "./Comment";
import EmptyCommentList from "./EmptyCommentList";

import { CommentListProps } from "src/types/comment";

export default function CommentList({
  data,
  updateComment = () => {},
  deleteComment = () => {},
}: CommentListProps) {
  if (data.list?.length === 0) {
    return <EmptyCommentList />;
  }

  const commentList = data.list.map((comment, index) => {
    return (
      <Comment
        key={`${comment.id}-${index}`}
        content={comment.content}
        ownerId={comment.ownerId}
        profileImgUrl={comment.ownerImage}
        nickname={comment.ownerNickname}
        date={comment.createdAt}
        commentId={comment.id}
        updateComment={updateComment}
        deleteComment={deleteComment}
      />
    );
  });

  return <div className="comment-list">{commentList}</div>;
}
