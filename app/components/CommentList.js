import Comment from "./Comment";

import style from "./comment-list.module.css";

export function CommentList({ type, id }) {
  const commentListClass = `flex-col ${style["comment-list"]}`;
  // 임시로 고정 댓글
  const temp = [0, 1, 2];
  const list = temp.map((commnet, index) => {
    return (
      <Comment
        key={index}
        content="테스트 댓글 본문"
        profileImgUrl={null}
        ownerName="작성자"
        date="2024-09-10T00:37:54.669Z"
        favoriteCount={9999}
        myFavorite={false}
      />
    );
  });

  return <div className={commentListClass}>{list}</div>;
}

export default CommentList;
