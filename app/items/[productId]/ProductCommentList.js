import Comment from "@/app/components/Comment";

// 임시로 사용 comment list의 세부 api return 형식이 달라서 임시로 ProductCommentList & css 생성
// 개인 BE 사용하는 미션에서 통합 예정
import style from "./product-comment-list.module.css";

export default function ProductCommentList({ data }) {
  const commentListClass = `flex flex-col ${style["comment-list"]}`;
  const emptyListClass = `${style["empty-list"]}`;
  const emptyMarkTextSetClass = `flex flex-col items-center justify-between ${style["empty-list-mark-text-set"]}`;
  const emptyMarkFrameClass = `${style["empty-list-mark"]}`;
  const emptyTextClass = `${style["empty-list-text"]}`;

  if (data.list?.length === 0) {
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

  const tempList = data.list.map((comment, index) => {
    return (
      <Comment
        key={`${comment.id}-${index}`}
        content={comment.content}
        profileImgUrl={comment.writer.image}
        nickname={comment.writer.nickname}
        date={comment.createdAt}
      />
    );
  });

  return <div className={commentListClass}>{tempList}</div>;
}
