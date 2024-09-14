import Button from "@/components/ui/Button";

export default function CreateArticle() {
  return (
    <>
      <div className={styles["top-bar"]}>
        <h2>게시글쓰기</h2>
        <Button type="primary">등록</Button>
      </div>
    </>
  );
}
