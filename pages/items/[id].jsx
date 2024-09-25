import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/utils/productApi";
import { fetchComments } from "@/utils/productChatApi";
import ItemInfo from "@/components/ItemDetailComponents/ItemInfo.jsx";
import ItemChat from "@/components/ItemDetailComponents/ItemChat.jsx";
import styles from "./[id].module.css";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";

export default function ProductDetail({ initialComments, id }) {
  // React Query로 제품 정보 가져오기
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return fetchProduct(id);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <ItemInfo product={product} />
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
