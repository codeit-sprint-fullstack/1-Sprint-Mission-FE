import Comment from "./Comment";

import style from "./comment-list.module.css";

export function CommentList({ list }) {
  const commentListClass = `flex-col ${style["comment-list"]}`;
  const emptyListClass = `${style["empty-list"]}`;
  const emptyMarkTextSetClass = `flex-col items-center justify-between ${style["empty-list-mark-text-set"]}`;
  const emptyMarkFrameClass = `${style["empty-list-mark"]}`;
  const emptyTextClass = `${style["empty-list-text"]}`;

  if (list.length === 0) {
    return (
      <div className={emptyListClass}>
        <div className={emptyMarkTextSetClass}>
          <div className={emptyMarkFrameClass} />
          <p className={emptyTextClass}>
            아직 댓글이 없어요,
            <br /> 지금 댓글을 달아보세요!
          </p>
        </div>
      </div>
    );
  }

  const tempList = list.map((comment, index) => {
    return (
      <Comment
        key={index}
        content={comment.content}
        profileImgUrl={comment.user.image}
        nickname={comment.user.nickname}
        date={comment.createdAt}
      />
    );
  });

  return <div className={commentListClass}>{tempList}</div>;
}

export default CommentList;
