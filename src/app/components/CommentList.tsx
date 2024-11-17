import Comment from "./Comment";
import EmptyCommentList from "./EmptyCommentList";

import { CommentData } from "src/types/comment";

export interface CommentListProps {
  list: CommentData[];

  updateComment?: ({
    commentId,
    content,
  }: {
    commentId: string;
    content: string;
  }) => void;
  deleteComment?: (commentId: string) => void;
}

export default function CommentList({
  list,
  updateComment = () => {},
  deleteComment = () => {},
}: CommentListProps) {
  console.log(" export default function CommentList list :", list);

  if (list?.length === 0) {
    return <EmptyCommentList />;
  }

  const commentList = list.map((comment, index) => {
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
