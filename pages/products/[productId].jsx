import ProductDetail from "@/components/product/ProductDetail";
import Message from "@/components/ui/Message";
import { getProductById } from "@/service/api/product";
import { productKey } from "@/variables/queryKeys";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/pages/products/main.module.scss";
import CommentForm from "@/components/form/CommentForm";
import CommentList from "@/components/comment/CommentList";
import ReturnToListBtn from "@/components/ui/ReturnToListBtn";
import { ENTITY } from "@/variables/entities";
import Loader from "@/components/ui/Loader";

// export async function getServerSideProps(context) {
//   const queryClient = new QueryClient();

//   const { productId } = context.params;
//   await queryClient.prefetchQuery({
//     queryKey: productKey.detail(productId),
//     queryFn: () => getProductById(productId),
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = router.query;
  const entity = ENTITY.PRODUCT;

  const {
    isError,
    error,
    data: product,
    isPending,
  } = useQuery({
    queryKey: productKey.detail(productId),
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    const errMsg = error?.message;
    return <Message msg={errMsg} type="error" />;
  }

  return (
    <>
      <Head>
        <title>상세페이지</title>
      </Head>
      <section className={styles.ProductDetailPage}>
        <ProductDetail product={product} entity={entity} />
        <div className={styles.line}></div>
        <CommentForm idPath={productId} whichComment={entity} />
        <CommentList idPath={productId} whichComment={entity} />
        <ReturnToListBtn isArticle={false} />
      </section>
    </>
  );
}
