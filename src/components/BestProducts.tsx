import { useQuery } from "@tanstack/react-query";
import { getProducts, ProductResponse } from "../api/productApi";
import Spinner from "../components/Spinner";
import { useRouter } from "next/router";
import styles from "./BestProducts.module.css";

const BestProducts = () => {
  const router = useRouter();

  const { data, isLoading, error } = useQuery<ProductResponse[], Error>({
    queryKey: ["bestProducts"],
    queryFn: async () => {
      const response = await getProducts(1, 4, "favorite");
      return response;
    },
    staleTime: 1000 * 60,
  });

  const bestProducts = data || [];

  const handleProductClick = (id: number) => {
    router.push(`/items/${id}`);
  };

  if (error) return <p>베스트 상품을 불러오는 중 오류가 발생했습니다: {error instanceof Error ? error.message : "알 수 없는 오류"}</p>;

  return (
    <Spinner dataLoaded={!isLoading}>
      <div className={styles.bestProductSection}>
        <h2 className={styles.sectionTitle}>베스트 상품</h2>
        <div className={styles.bestProductsContainer}>
          {bestProducts.map((item) => (
            <div
              key={item.id}
              className={styles.bestProduct}
              onClick={() => handleProductClick(item.id)}
            >
              <img
                src={item.images[0] || "/image/default.svg"}
                alt={item.name}
                className={styles.productImg}
              />
              <h2 className={styles.productTitle}>{item.name}</h2>
              <h2 className={styles.productPrice}>
                {item.price.toLocaleString("ko-KR")}원
              </h2>
            </div>
          ))}
        </div>
      </div>
    </Spinner>
  );
};

export default BestProducts;

