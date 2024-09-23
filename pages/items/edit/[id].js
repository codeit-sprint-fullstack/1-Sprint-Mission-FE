import EditBtn from "@/components/EditProductComponents/EditBtn";
import { fetchProduct } from "@/utils/productApi";
import styles from "./[id].module.css";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const item = await fetchProduct(id);
    return {
      props: { item },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      notFound: true,
    };
  }
}

export default function editItems({ item }) {
  return (
    <div className={styles.container}>
      <EditBtn item={item} />
    </div>
  );
}
