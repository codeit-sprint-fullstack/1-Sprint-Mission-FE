import { useState } from "react";
import Image from "next/image";
import defaultUserImg from "@/images/defaultUserImg.png";
import styles from "./ProductPatchComment.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchProductByIdComment } from "@/lib/productApi";
import { ProductPatchCommentProps } from "@/types/Types";

export default function ProductPatchComment({
  comment,
  setEditCommentId,
}: ProductPatchCommentProps) {
  const [editContent, setEditContent] = useState(comment.content);
  const commentId = comment.id;

  const queryClient = useQueryClient(); // 캐시를 관리하기 위한 QueryClient

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEditContent(value);
  };

  // 댓글 수정 useMutation
  const patchCommentMutation = useMutation({
    mutationFn: (newComment: string) =>
      patchProductByIdComment(commentId, newComment),
    onSuccess: () => {
      console.log("댓글이 성공적으로 수정되었습니다.");
      queryClient.invalidateQueries({
        // 이 부분을 확인해야 돼
        // queryKey: ["productComments", comment.productId],
        queryKey: ["productComments"],
      });
      setEditCommentId(null); // 수정 모드 종료
    },
    onError: (error) => {
      console.log("댓글 수정 중 오류 발생 : ", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 공백만 있는 경우 막아준다.
    if (!editContent.trim()) {
      return;
    }
    patchCommentMutation.mutate(editContent);
  };

  const handleCancel = () => {
    setEditCommentId(null);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <textarea
        className={styles.inputComment}
        placeholder="수정할 내용을 입력해주세요."
        value={editContent}
        onChange={handleChange}
      />
      <div className={styles.footer}>
        <div className={styles.user}>
          <Image
            src={comment.writer.image || defaultUserImg}
            alt="user"
            width={32}
            height={32}
          />
          <div className={styles.userInfo}>
            <span className={styles.nickname}>{comment.writer.nickname}</span>
            <span className={styles.createdAt}>
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={handleCancel}>
            취소
          </button>
          <button className={styles.complete} type="submit">
            수정 완료
          </button>
        </div>
      </div>
    </form>
  );
}
