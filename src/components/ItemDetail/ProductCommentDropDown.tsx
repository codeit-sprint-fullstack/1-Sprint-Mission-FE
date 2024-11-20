import Image from "next/image";
import styles from "@/components/BoardDetail/KebabDropDown.module.css";
import kebab from "@/images/ic_kebab.png";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductByIdComment } from "@/lib/productApi";
import { ProductCommentDropDownProps } from "@/types/Types";

export default function ProductCommentDropDown({
  writerId,
  commentId,
  setEditCommentId,
}: ProductCommentDropDownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const productId = id;

  const queryClient = useQueryClient(); // 캐시를 관리하기 위한 QueryClient

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  // 상품 댓글 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteProductByIdComment(commentId),
    onSuccess: () => {
      console.log("댓글이 성공적으로 삭제되었습니다.");
      queryClient.invalidateQueries({
        // queryKey를 넣어주지 않으면 에러 발생
        queryKey: ["productComments", productId],
      }); // 댓글 목록 쿼리 무효화 및 재요청
    },
    onError: (error) => {
      console.log("댓글 삭제 중 오류 발생: ", error);
    },
  });

  const handleDelete = () => {
    deleteCommentMutation.mutate();
  };

  // 수정 모드로 전환
  const handleEdit = () => {
    // 수정할 댓글의 ID 설정
    setEditCommentId(commentId);
  };

  return (
    <div className={styles.dropDownContainer}>
      <Image
        className={styles.kebab}
        src={kebab}
        alt="kebab"
        onClick={toggleDropDown}
      />
      {isOpen && (
        <div className={styles.dropDown}>
          <a className={styles.dropDownText} onClick={handleEdit}>
            수정하기
          </a>
          <a onClick={handleDelete}>삭제하기</a>
        </div>
      )}
    </div>
  );
}
