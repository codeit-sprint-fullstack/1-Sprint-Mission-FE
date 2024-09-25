import CreateBtn from "@/components/CreateProductComponents/CreateBtn.jsx";
import styles from "@/styles/createProduct.module.css";

export default function createProduct() {
  return (
    <div className={styles.container}>
      <CreateBtn />
    </div>
  );
}
