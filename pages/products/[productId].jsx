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

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  const { productId } = context.params;
  await queryClient.prefetchQuery({
    queryKey: productKey.detail(productId),
    queryFn: () => getProductById(productId),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = router.query;

  const {
    isError,
    error,
    data: product,
  } = useQuery({
    queryKey: productKey.detail(productId),
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

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
        <ProductDetail product={product} />
        <div className={styles.line}></div>
        <CommentForm idPath={productId} whichComment="product" />
        <CommentList idPath={productId} whichComment="product" />
        <ReturnToListBtn isArticle={false} />
      </section>
    </>
  );
}
