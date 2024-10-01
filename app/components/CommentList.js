import Comment from "./Comment";
import EmptyCommentList from "./EmptyCommentList";

export default function CommentList({ data, updateComment, deleteComment }) {
  if (data.list?.length === 0) {
    return <EmptyCommentList />;
  }

  const commentList = data.list.map((comment, index) => {
    return (
      <Comment
        key={`${comment.id}-${index}`}
        content={comment.content}
        ownerId={comment.writer.id}
        profileImgUrl={comment.writer.image}
        nickname={comment.writer.nickname}
        date={comment.createdAt}
        commentId={comment.id}
        updateComment={updateComment}
        deleteComment={deleteComment}
      />
    );
  });

  return <div className="comment-list">{commentList}</div>;
}
