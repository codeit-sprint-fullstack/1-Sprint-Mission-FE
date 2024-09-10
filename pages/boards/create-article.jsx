import Button from "@/components/Button/Button";

export default function createArticle() {
  return (
    <>
      <div className={styles["top-bar"]}>
        <h2>게시글쓰기</h2>
        <Button type="primary">등록</Button>
      </div>
    </>
  );
}
