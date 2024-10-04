import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ItemsPageHeader from "../../components/ItemsPageHeader";
import ProductDetail from "../../components/ProductDetail";
import ProductCommentItem from "../../components/ProductCommentItem";
import Footer from "../../components/Footer";
import styles from "../PostDetailPage.module.css";

import {
  fetchProductById,
  fetchCommentsByProductId,
  createCommentForProduct,
  updateMarketComment,
  deleteProduct,
  likeProduct,
  unlikeProduct,
} from "../../api/api"; // 상품 및 댓글 API 호출
import MarketNoComments from "../../components/MarketNoComments"; // MarketNoComments 컴포넌트 import
import Spinner from "../../components/Spinner"; // Spinner 컴포넌트 import
import ConfirmationModal from "../../components/ConfirmationModal"; // 상품 삭제 확인모달 컴포넌트

export default function ProductDetailPage() {
  const router = useRouter();
  const { itemId } = router.query; // URL에서 itemId를 추출
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [product, setProduct] = useState(null); // product 상태 추가

  // 상품 정보를 가져오는 useQuery
  const { data: productData, error: productError } = useQuery({
    queryKey: ["product", itemId],
    queryFn: () => fetchProductById(itemId),
    enabled: !!itemId,
    staleTime: 10000, // 10초 동안 데이터 유효
    refetchInterval: 30000, // 30초마다 데이터 새로 고침
    onSuccess: (data) => setProduct(data), // 성공적으로 데이터 가져온 후 product 상태 업데이트
  });

  // 상품 정보를 불러오는 함수
  const fetchProduct = async () => {
    try {
      if (!itemId) {
        console.error("itemId가 정의되지 않았습니다.");
        return;
      }
      const productData = await fetchProductById(itemId);
      setProduct(productData);
    } catch (err) {
      console.error("상품 불러오기 오류:", err);
      setError("상품을 불러오는 데 실패했습니다.");
    }
  };

  // 댓글을 가져오는 useQuery
  const { data: commentsData, error: commentsError } = useQuery({
    queryKey: ["comments", itemId],
    queryFn: () => fetchCommentsByProductId(itemId, 10),
    enabled: !!itemId,
    staleTime: 10000,
    refetchInterval: 30000,
    onSuccess: (data) => {
      if (data && Array.isArray(data.comments)) {
        setComments(
          data.comments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } else {
        console.warn("댓글 데이터가 없습니다.");
        setComments([]); // 빈 배열로 초기화
      }
    },
  });

  // 댓글을 불러오는 함수 (시간순 정렬)
  const fetchCommentsData = async () => {
    try {
      if (!itemId) {
        console.error("itemId가 정의되지 않았습니다.");
        return;
      }
      const response = await fetchCommentsByProductId(itemId, 10);
      if (response && Array.isArray(response.comments)) {
        setComments(
          response.comments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } else {
        console.warn("댓글 데이터가 없습니다.");
        setComments([]); // 빈 배열로 초기화
      }
    } catch (err) {
      console.error("댓글 불러오기 오류:", err);
    }
  };

  // 댓글 등록 핸들러
  const handleCommentSubmit = async (comment) => {
    if (comment.trim()) {
      try {
        const commentData = {
          content: comment,
          author: "작성자 판다",
          createdAt: new Date().toISOString(),
        };
        // 서버에 댓글을 등록하고 응답을 받아옴
        const newComment = await createCommentForProduct(
          product.id,
          commentData
        );
        // 새로운 댓글을 기존 댓글 목록 앞에 추가하여 최신순으로 정렬
        setComments((prevComments) => [newComment, ...prevComments]);
      } catch (error) {
        console.error("댓글 등록 실패:", error);
      }
    }
  };

  // 댓글 수정 핸들러
  const handleCommentUpdate = async (commentId, updatedData) => {
    try {
      await updateMarketComment(commentId, updatedData);
      fetchCommentsData(); // 댓글 목록 재조회
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  // 상품 삭제 핸들러
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(itemId);
      router.push("/items"); // 목록 페이지로 리다이렉트
    } catch (error) {
      console.error("상품 삭제 실패:", error);
    }
  };

  // 상품 좋아요 핸들러
  const handleLikeProduct = async () => {
    try {
      await likeProduct(itemId);
      fetchProduct(); // 상품 정보 재조회
    } catch (error) {
      console.error("상품 좋아요 실패:", error);
    }
  };

  // 상품 좋아요 취소 핸들러
  const handleUnlikeProduct = async () => {
    try {
      await unlikeProduct(itemId);
      fetchProduct(); // 상품 정보 재조회
    } catch (error) {
      console.error("상품 좋아요 취소 실패:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!itemId) return; // itemId가 없으면 함수 종료
      setLoading(true);
      await fetchProduct();
      await fetchCommentsData();
      setLoading(false);
    };

    fetchData();
  }, [itemId]);

  if (loading) return <Spinner />;
  if (error || productError || commentsError)
    return <div>{error || productError || commentsError}</div>;

  return (
    <div>
      <ItemsPageHeader />
      <main className={styles.main}>
        <ProductDetail
          product={product} // product 상태를 ProductDetail에 전달
          productId={itemId}
          onLike={handleLikeProduct}
          onUnlike={handleUnlikeProduct}
          onCommentSubmit={handleCommentSubmit}
        />
        <div className={styles.commentsList}>
          {comments.length === 0 ? (
            <MarketNoComments />
          ) : (
            comments.map(
              (
                comment // commentsData를 제거하고 comments 배열 사용
              ) => (
                <ProductCommentItem
                  key={comment.id}
                  comment={comment}
                  itemId={itemId} // productId를 itemId로 변경
                  onCommentUpdate={handleCommentUpdate}
                  fetchCommentsData={fetchCommentsData}
                />
              )
            )
          )}
        </div>
        <button
          className={styles.BackBtn}
          onClick={() => router.push("/items")}
        >
          목록으로 돌아가기 ↩
        </button>

        <ConfirmationModal
          isOpen={showConfirmModal}
          onConfirm={handleDeleteProduct}
          onCancel={() => setShowConfirmModal(false)}
        />
      </main>
      <Footer />
    </div>
  );
}
