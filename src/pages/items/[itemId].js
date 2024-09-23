import { useRouter } from "next/router";
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
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  // 댓글을 불러오는 함수
  const fetchCommentsData = async () => {
    try {
      if (!itemId) {
        console.error("itemId가 정의되지 않았습니다.");
        return;
      }
      const response = await fetchCommentsByProductId(itemId, 10);
      setComments(response.list); // 댓글 목록 업데이트
    } catch (err) {
      console.error("댓글 불러오기 오류:", err);
    }
  };

  // 댓글 등록 핸들러
  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        const commentData = {
          content: comment,
          author: "작성자 판다",
          createdAt: new Date().toISOString(),
          limit: 3,
        };
        await createCommentForProduct(product.id, commentData);
        setComment(""); // 입력 필드 초기화
        setIsCommentButtonEnabled(false); // 버튼 비활성화
        fetchCommentsData(); // 댓글 목록 재조회
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
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ItemsPageHeader />
      <main className={styles.main}>
        <ProductDetail
          productId={itemId}
          onLike={handleLikeProduct}
          onUnlike={handleUnlikeProduct}
          onCommentSubmit={handleCommentSubmit}
        />
        <div className={styles.commentsList}>
          {comments.length === 0 ? (
            <MarketNoComments />
          ) : (
            comments.map((comment) => (
              <ProductCommentItem
                key={comment.id}
                comment={comment}
                itemId={itemId} // productId를 itemId로 변경
                onCommentUpdate={handleCommentUpdate}
                fetchCommentsData={fetchCommentsData}
              />
            ))
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
