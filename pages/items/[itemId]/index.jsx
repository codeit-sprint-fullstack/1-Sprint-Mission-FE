import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getProductDetails } from "@/utils/productAPI";
import Link from "next/link";
import CommentSection from "@/components/items/CommentSection";
import { useProductMutations } from "@/hooks/useProductMutation";
import { useModal } from "@/contexts/ModalContext";
import styles from "./index.module.css";
import ProductInfo from "./ProductInfo";
import ProductMetadata from "./ProductMetadata";

const ProductDetail = ({ initialProduct }) => {
  const router = useRouter();
  const { itemId } = router.query;
  const cleanItemId = itemId ? itemId.split(":")[0] : null;
  const { showModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(["product", cleanItemId], () => getProductDetails(cleanItemId), {
    initialData: initialProduct,
    enabled: !!cleanItemId,
  });

  const { updateMutation, deleteMutation, favoriteMutation } =
    useProductMutations(cleanItemId, showModal);

  const handleEdit = useCallback(() => {
    setEditedProduct({ ...product });
    setIsEditing(true);
  }, [product]);

  const handleSave = useCallback(() => {
    updateMutation.mutate(editedProduct, {
      onSuccess: () => {
        setIsEditing(false);
      },
      onError: (error) => {
        showModal({
          content: `
          ${error.message}`,
          confirmText: "확인",
          showCancel: false,
          customClass: styles.errorModal,
        });
      },
    });
  }, [updateMutation, editedProduct, showModal]);

  const handleDeleteProduct = useCallback(() => {
    showModal({
      content: "정말로 상품을 삭제하시겠어요?",
      onConfirm: () =>
        deleteMutation.mutate(null, {
          onSuccess: () => router.push("/items"),
          onError: (error) => {
            showModal({
              content: `${error.message}`,
              confirmText: "확인",
              showCancel: false,
              customClass: styles.errorModal,
            });
          },
        }),
      confirmText: "삭제",
      cancelText: "취소",
      showCancel: true,
    });
  }, [showModal, deleteMutation, router]);

  const handleFavorite = useCallback(() => {
    favoriteMutation.mutate(null, {
      onError: (error) => {
        showModal({
          content: `${error.message}`,
          confirmText: "확인",
          showCancel: false,
          customClass: styles.errorModal,
        });
      },
    });
  }, [favoriteMutation, product, showModal]);

  const kebabMenuOptions = useMemo(
    () => [
      { label: "수정하기", onClick: handleEdit },
      { label: "삭제하기", onClick: handleDeleteProduct },
    ],
    [handleEdit, handleDeleteProduct]
  );

  if (isLoading) return <div className={styles.loading}>로딩 중...</div>;
  if (isError) return <div className={styles.error}>에러가 발생했습니다.</div>;
  if (!product)
    return <div className={styles.error}>상품을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          {product.images && product.images.length > 0 && (
            <img
              src={product.images[0]}
              alt={product.name}
              className={styles.productImage}
            />
          )}
        </div>
        <div className={styles.productInfoMetaHug}>
          <ProductInfo
            product={product}
            isEditing={isEditing}
            editedProduct={editedProduct}
            setEditedProduct={setEditedProduct}
            handleSave={handleSave}
            kebabMenuOptions={kebabMenuOptions}
          />
          <ProductMetadata product={product} handleFavorite={handleFavorite} />
        </div>
      </div>
      <CommentSection productId={cleanItemId} />
      <Link href="/items" className={styles.returnButton}>
        <div className={styles.returnButtonHug}>
          <div>목록으로 돌아가기</div>
          <img src="/images/ic_return.svg" alt="목록으로 돌아가기" />
        </div>
      </Link>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { itemId } = context.params;
  const cleanItemId = itemId ? itemId.split(":")[0] : null;

  const token = context.req.cookies.token;

  try {
    const initialProduct = await getProductDetails(cleanItemId, token);
    return {
      props: { initialProduct },
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return {
      props: { initialProduct: null },
    };
  }
}

export default ProductDetail;
