import { fetchProduct } from "@/utils/productApi";
import { fetchComments } from "@/utils/productChatApi";
import ItemInfo from "@/components/ItemDetailComponents/ItemInfo";
import ItemChat from "@/components/ItemDetailComponents/ItemChat";
import styles from "./[id].module.css";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";

export default function ProductDetail({ product, comments, id }) {
  return (
    <>
      <div className={styles.container}>
        <ItemInfo product={product} />
        <ItemChat comments={comments} id={id} />
        <Link href={ROUTES.ITEMS} passHref>
          <button className={styles.backBtn}>목록으로 돌아가기</button>
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const productDetail = await fetchProduct(id);
    const productComment = await fetchComments(id);
    return {
      props: {
        product: productDetail,
        comments: productComment,
        id,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "상품을 불러오는 중 문제가 발생했습니다.",
      },
    };
  }
}
