export default function PostForm() {
  return (
    <form className={style.Post}>
      <div>
        <div>게시글 쓰기</div>
        <button>등록</button>
      </div>
      <label htmlFor="title">*제목</label>
      <input id="title" />
      <label htmlFor="content">*내용</label>
      <input id="content" />
    </form>
  );
}
