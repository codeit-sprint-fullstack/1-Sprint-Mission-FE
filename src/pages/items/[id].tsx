import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchProduct } from "@/utils/productApi";
import { fetchComments } from "@/utils/productChatApi";
import ItemInfo from "@/components/ItemDetailComponents/ItemInfo";
import ItemChat from "@/components/ItemDetailComponents/ItemChat";
import styles from "./[id].module.css";
import Link from "next/link";
import { ROUTES } from "@/utils/rotues";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Comment } from "@/types/Types";

// ProductDetail 컴포넌트의 props 인터페이스 정의
interface ProductDetailProps {
  initialComments: { list: Comment[]; nextCursor?: number | null };
  id: number;
}

// ProductDetail 컴포넌트 정의
export default function ProductDetail({
  initialComments,
  id,
}: ProductDetailProps) {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
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

// getServerSideProps 함수 정의
export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    initialComments: { list: Comment[]; nextCursor?: number | null };
    id: number;
    dehydratedState: any;
  }>
> {
  const { id } = context.params as { id: string };
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["product", productId],
      queryFn: () => fetchProduct(productId),
    });
    await queryClient.prefetchQuery({
      queryKey: ["comments", productId],
      queryFn: () => fetchComments(productId),
    });

    const productComment = await fetchComments(productId);

    return {
      props: {
        initialComments: productComment,
        id: productId,
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        initialComments: { list: [], nextCursor: null },
        id: productId,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
}
