import { fetchProduct } from "@/utils/productApi";
import ItemInfo from "@/components/ItemDetailComponents/ItemInfo";
import styles from "./[id].module.css";

export default function productDetail(product) {
  return (
    <div className={styles.container}>
      <ItemInfo product={product} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const productDetail = await fetchProduct(id);
    return {
      props: {
        product: productDetail,
      },
    };
  } catch (error) {
    return {
      notFound: true,
      error: "상품을 불러오는 중 문제가 발생했습니다.",
    };
  }
}
