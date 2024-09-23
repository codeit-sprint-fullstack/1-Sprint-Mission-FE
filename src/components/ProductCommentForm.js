import { useState } from "react";
import { createComment } from "../api/commentApi";
import styles from "./ProductCommentForm.module.css";

const ProductCommentForm = ({ productId, addNewComment, accessToken }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newComment = await createComment(productId, content, accessToken);
      alert("댓글이 등록되었습니다.");
      addNewComment(newComment); // 부모로부터 전달된 addNewComment 함수 호출
      setContent(""); // 입력 필드 초기화
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.productCommentForm}>
      <div className={styles.formGroup}>
        <label htmlFor="content">문의하기</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.
          "
          style={{ height: "100px" }}
        />
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting || !content}
      >
        {isSubmitting ? "등록 중..." : "등록"}
      </button>
    </form>
  );
};

export default ProductCommentForm;

