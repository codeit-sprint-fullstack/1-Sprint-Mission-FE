import { useEffect, useState } from "react";
import { fetchProduct } from "@/utils/productApi";
import { fetchComments } from "@/utils/productChatApi";
import ItemInfo from "@/components/ItemDetailComponents/ItemInfo";
import ItemChat from "@/components/ItemDetailComponents/ItemChat";
import styles from "./[id].module.css";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";

export default function ProductDetail({ initialComments, id }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 클라이언트에서 토큰을 로컬 스토리지에서 가져옴
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setError("인증 토큰이 없습니다.");
          return;
        }

        // 토큰으로 상품 정보 불러오기
        const productDetail = await fetchProduct(id, token);
        setProduct(productDetail);
      } catch (error) {
        setError("상품을 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {product && <ItemInfo product={product} />}
      <ItemChat initialComments={initialComments} id={id} />
      <Link href={ROUTES.ITEMS} passHref>
        <button className={styles.backBtn}>목록으로 돌아가기</button>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const productComment = await fetchComments(id);

    return {
      props: {
        initialComments: productComment,
        id,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        initialComments: [],
        id,
        error: "댓글을 불러오는 중 문제가 발생했습니다.",
      },
    };
  }
}
