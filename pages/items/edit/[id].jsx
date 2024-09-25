import { useRouter } from "next/router";
import EditBtn from "@/components/EditProductComponents/EditBtn.jsx";
import { fetchProduct } from "@/utils/productApi";
import styles from "./[id].module.css";
import { useQuery } from "@tanstack/react-query";

export default function EditItems() {
  const router = useRouter();
  const { id } = router.query;

  const {
    error,
    isLoading,
    data: product,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return fetchProduct(id);
    },
  });

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <EditBtn item={product} />
    </div>
  );
}
