import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditBtn from "@/components/EditProductComponents/EditBtn";
import { fetchProduct } from "@/utils/productApi";
import styles from "./[id].module.css";

export default function EditItems() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("accessToken");

          if (!token) {
            setError("인증 토큰이 없습니다.");
            return;
          }

          const productDetail = await fetchProduct(id, token);
          setProduct(productDetail);
        } catch (error) {
          setError("상품을 불러오는 중 문제가 발생했습니다.");
        }
      };

      fetchData();
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <EditBtn item={product} />
    </div>
  );
}
