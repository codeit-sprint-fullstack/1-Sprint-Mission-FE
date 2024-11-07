import { useRouter } from "next/router";
import EditBtn from "@/components/EditProductComponents/EditBtn";
import { fetchProduct } from "@/utils/productApi";
import styles from "./[id].module.css";
import { useQuery } from "@tanstack/react-query";

export default function EditItems() {
  const router = useRouter();
  const { id } = router.query;

  const {
    error,
    isLoading,
    isFetching,
    data: product,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return fetchProduct(parseInt(id as string));
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (error) {
    return <div>{error?.toString()}</div>;
  }

  if (isLoading || isFetching) {
    return <div>로딩 중...</div>;
  }

  if (!product) {
    return <div>제품 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <EditBtn item={product} />
    </div>
  );
}
