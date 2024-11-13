export default function EmptyCommentList() {
  return (
    <div className="empty-comment-list">
      <div className="empty-comment-list_mark-text-set">
        <div className="empty-comment-list_mark" />
        <p className="empty-comment-list_text">
          아직 댓글이 없어요,
          <br /> 지금 댓글을 달아보세요!
        </p>
      </div>
    </div>
  );
}
