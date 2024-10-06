import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  getProductById,
  favoriteProduct,
  unfavoriteProduct,
} from "../../api/productApi";
import { getComments } from "../../api/commentApi";
import { getAccessToken } from "../../api/authApi";
import Modal from "../../components/Modal";
import ProductCommentForm from "../../components/ProductCommentForm";
import ProductCommentItem from "../../components/ProductCommentItem";
import ProductEmptyComments from "../../components/ProductEmptyComments";
import ProductBackButton from "../../components/ProductBackButton";
import ProductKebabMenu from "../../components/ProductKebabMenu";
import ProductEditModal from "../../components/ProductEditModal";
import Spinner from "../../components/Spinner";
import styles from "../../styles/itemDetail.module.css";

const SERVER_URL = "https://baomarket.onrender.com";

const ProductDetailPage = () => {
  const router = useRouter();
  const { itemId } = router.query; // itemId가 URL에서 추출됨
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    description: "",
    tags: [],
  });

  // 페이지가 로드될 때 accessToken을 getAccessToken 함수로 가져옴
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getAccessToken();
      setAccessToken(token);
    }
  }, []);

  const {
    data: productData,
    error: productError,
    isLoading: isProductLoading,
  } = useQuery({
    queryKey: ["product", itemId],
    queryFn: () => getProductById(itemId),
    enabled: !!itemId,
    onSuccess: (data) => {
      setIsLiked(data.isFavorited);
      setEditedProduct({
        name: data.name,
        price: data.price,
        description: data.description,
        tags: data.tags || [],
      });
    },
  });

  const loadComments = async () => {
    try {
      console.log("불러오는 productId (itemId):", itemId); // itemId 로그 추가
      const data = await getComments(itemId); // itemId가 productId로 사용됨
      setComments(data.list || []);
    } catch (error) {
      console.error("댓글 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (itemId) {
      loadComments(); // 댓글 목록 불러오기
    }
  }, [itemId]);

  const likeMutation = useMutation({
    mutationFn: isLiked
      ? () => unfavoriteProduct(itemId, accessToken)
      : () => favoriteProduct(itemId, accessToken),
    onSuccess: () => {
      setIsLiked(!isLiked);
      productData.favoriteCount = isLiked
        ? productData.favoriteCount - 1
        : productData.favoriteCount + 1;
    },
    onError: () => {
      setModalMessage("좋아요 처리 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    },
  });

  const handleLikeToggle = () => {
    if (accessToken) {
      likeMutation.mutate();
    } else {
      setModalMessage("로그인이 필요합니다.");
      setIsModalOpen(true);
    }
  };

  const addNewComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  if (isProductLoading) {
    return <Spinner dataLoaded={!isProductLoading} />;
  }

  if (productError) return <p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div>
      <div className={styles.itemDetail}>
        {productData?.images?.length > 0 && (
          <img
            src={`${SERVER_URL}/uploads/${productData.images[0]}`}
            alt={productData?.name}
            className={styles.image}
          />
        )}
        <div className={styles.infoContainer}>
          {/* 나머지 코드 */}
        </div>
      </div>

      {/* 나머지 코드 */}
    </div>
  );
};

export default ProductDetailPage;

