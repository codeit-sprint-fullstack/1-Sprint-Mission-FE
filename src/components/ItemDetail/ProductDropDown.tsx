import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/components/BoardDetail/KebabDropDown.module.css";
import kebab from "@/images/ic_kebab.png";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductDeleteModal from "./ProductDeleteModal";
import { deleteProductById } from "@/lib/productApi";

export default function ProductDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query; // URL에서 상품 ID 가져오기
  const productId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  const queryClient = useQueryClient(); // 캐시를 관리하기 위한 QueryClient

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const isDeleteModalOpen = () => {
    setIsModalOpen(true);
  };

  const isDeleteModalClose = () => {
    setIsModalOpen(false);
  };

  // 상품 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteProductById(productId as number),
    onSuccess: () => {
      console.log("상품이 성공적으로 삭제되었습니다.");
      router.push("/products");
    },
    onError: (error) => {
      console.error("상품 삭제 중 오류 발생:", error);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <>
      <div className={styles.dropDownContainer}>
        <Image
          className={styles.kebab}
          src={kebab}
          alt="kebab"
          onClick={toggleDropDown}
        />
        {isOpen && (
          <div className={styles.dropDown}>
            <a className={styles.dropDownText}>수정하기</a>
            <a onClick={isDeleteModalOpen}>삭제하기</a>
          </div>
        )}
      </div>
      {isModalOpen && (
        <ProductDeleteModal
          isDeleteModalClose={isDeleteModalClose}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}
