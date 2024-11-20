import Image from "next/image";
import styles from "./ProductDeleteModal.module.css";
import deleteIcon from "@/images/ic_check.png";
import { ProductDeleteModalProps } from "@/types/Types";

export default function ProductDeleteModal({
  isDeleteModalClose,
  handleDelete,
}: ProductDeleteModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <Image src={deleteIcon} alt="delete" />
        <span className={styles.comment}>정말로 상품을 삭제하시겠어요?</span>
        <div className={styles.button}>
          <button className={styles.cancel} onClick={isDeleteModalClose}>
            취소
          </button>
          <button className={styles.confirm} onClick={handleDelete}>
            네
          </button>
        </div>
      </div>
    </div>
  );
}
