import Image from "next/image";
import NoComment from "./NoComment";
import defaultUserImg from "@/images/defaultUserImg.png";
import styles from "./CommentList.module.css";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getProductByIdComments } from "@/lib/productApi";
import { useRouter } from "next/router";
import ProductCommentDropDown from "../ItemDetail/ProductCommentDropDown";
import ProductPatchComment from "../ItemDetail/ProductPatchComment";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import {
  AuthContextType,
  Comment,
  ProductCommentsResponse,
} from "@/types/Types";
import { AxiosError } from "axios";

export default function ItemCommentList() {
  const [editCommentId, setEditCommentId] = useState<number | null>(null); // 수정 모드 상태 관리
  const { user } = useAuth() as AuthContextType; // user 정보 가져오기
  const router = useRouter();
  const { id } = router.query; // URL에서 상품 ID 가져오기
  const productId = typeof id === "string" ? parseInt(id, 10) : undefined;

  // useQuery를 사용하여 데이터 가져오기
  const {
    data,
    isError,
    isLoading,
  }: UseQueryResult<ProductCommentsResponse, AxiosError> = useQuery({
    queryKey: ["productComments", productId],
    queryFn: () => getProductByIdComments(productId as number),
    enabled: !!productId, // productId가 있을 때만 쿼리 실행
  });

  // 로딩 중일 때
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 발생 시
  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  // 데이터가 없을 때
  if (!data) {
    return <NoComment />; // NoComment 컴포넌트를 렌더링
  }

  const prodcutCommentsList = data.list;

  return (
    <ul className={styles.commentListContainer}>
      {prodcutCommentsList.map((comment: Comment) => (
        <li key={comment.id}>
          <div className={styles.commentList}>
            {editCommentId === comment.id && user?.id === comment.writer.id ? (
              <ProductPatchComment
                comment={comment}
                setEditCommentId={setEditCommentId}
              />
            ) : (
              <>
                <div className={styles.commentListHeader}>
                  <span className={styles.content}>{comment.content}</span>
                  <ProductCommentDropDown
                    writerId={comment.writer.id}
                    commentId={comment.id}
                    setEditCommentId={setEditCommentId}
                  />
                </div>
                <div className={styles.commentInfoContainer}>
                  <Image
                    src={comment.writer.image || defaultUserImg}
                    alt="user"
                    width={32}
                    height={32}
                  />
                  <div className={styles.commentInfo}>
                    <span className={styles.user}>
                      {comment.writer.nickname}
                    </span>
                    <span className={styles.date}>
                      {/* 날짜로 변환 */}
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
