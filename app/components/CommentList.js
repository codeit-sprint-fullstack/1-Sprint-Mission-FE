import Comment from "./Comment";

import style from "./comment-list.module.css";

export function CommentList({ list }) {
  const commentListClass = `flex-col ${style["comment-list"]}`;

  const tempList = list.map((comment, index) => {
    return (
      <Comment
        key={index}
        content={comment.content}
        profileImgUrl={null}
        ownerName={comment.user.name}
        date={comment.createdAt}
      />
    );
  });

  return <div className={commentListClass}>{tempList}</div>;
}

export default CommentList;
