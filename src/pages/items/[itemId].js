import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ItemsPageHeader from "../../components/ItemsPageHeader";
import ProductDetail from "../../components/ProductDetail";
import FreeBoardCommentItem from "../../components/FreeBoardCommentItem";
import Footer from "../../components/Footer";
import styles from "../PostDetailPage.module.css";
import {
  fetchProductById,
  fetchCommentsByProductId,
  createCommentForProduct,
} from "../../api/api"; // 상품 및 댓글 API 호출
import NoComments from "../../components/NoComments"; // NoComments 컴포넌트 import
import Spinner from "../../components/Spinner"; // Spinner 컴포넌트 import

export default function ProductDetailPage() {
  const router = useRouter();
  const { itemId } = router.query; // URL에서 itemId를 추출
  console.log("ID from router:", itemId);
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 상품 정보를 불러오는 함수
  const fetchProduct = async () => {
    try {
      if (!itemId) return;
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
      if (!id) return;
      const allComments = await fetchCommentsByProductId(id); // API 호출
      setComments(allComments);
      filterComments(allComments);
    } catch (err) {
      console.error("댓글 불러오기 오류:", err);
    }
  };

  // 댓글 필터링 함수
  const filterComments = (allComments) => {
    const postComments = allComments.filter(
      (comment) => comment.postId === parseInt(itemId)
    );
    setFilteredComments(postComments);
  };

  // 댓글 등록 핸들러
  const handleCommentSubmit = async (commentData) => {
    try {
      await createCommentForProduct(id, commentData); // API 호출
      const allComments = await fetchCommentsByProductId(id); // 댓글 목록 재조회
      setComments(allComments);
      filterComments(allComments);
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
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
        {/* 상품 상세 컴포넌트에 productId 전달 */}
        <ProductDetail productId={itemId} />
        <div className={styles.commentsList}>
          {filteredComments.length === 0 ? (
            <NoComments />
          ) : (
            filteredComments.map((comment) => (
              <FreeBoardCommentItem
                key={comment.id}
                comment={comment}
                onCommentUpdate={handleCommentUpdate}
              />
            ))
          )}
        </div>
        <button className={styles.BackBtn} onClick={() => router.back()}>
          목록으로 돌아가기 ↩
        </button>
      </main>
      <Footer />
    </div>
  );
}
