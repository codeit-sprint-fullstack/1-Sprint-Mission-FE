import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductById } from "../api/productApi";
import Spinner from "../components/Spinner";
import { useRouter } from "next/router";
import styles from "./BestProducts.module.css";

const BestProducts = () => {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bestProducts"],
    queryFn: () => getProducts(1, 4, "favorite"),
    staleTime: 1000 * 60, // 1분
    cacheTime: 1000 * 60 * 10, // 10분
  });

  const bestProducts = Array.isArray(data?.list) ? data.list : [];

  const handleProductClick = (id) => {
    router.push(`/items/${id}`);
  };

  if (error) return <p>베스트 상품을 불러오는 중 오류가 발생했습니다: {error.message}</p>;

  return (
    <Spinner dataLoaded={!isLoading}>
      <div className={styles.bestProductSection}>
        <h2 className={styles.sectionTitle}>베스트 상품</h2>
        <div className={styles.bestProductsContainer}>
          {bestProducts.map((item) => (
            <div
              key={item._id || item.id}
              className={styles.bestProduct}
              onClick={() => handleProductClick(item._id || item.id)}
            >
              <img
                src={item.image?.[0] || "/image/default.svg"}
                alt={item.name}
                className={styles.productImg}
              />
              <h2 className={styles.productTitle}>{item.name}</h2>
              <h2 className={styles.productPrice}>
                {item.price.toLocaleString("ko-KR")}원
              </h2>
              <span className={styles.like}>
                <img src="/image/heart.svg" alt="좋아요" />
                {item.favoriteCount || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Spinner>
  );
};

export default BestProducts;

