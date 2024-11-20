"use client";

import { useParams } from "next/navigation";
import { CommentSection } from "@/app/_components/product/detail/CommentSection";
import ProductImages from "@/app/_components/product/detail/ProductImages";
import { ProductInfo } from "@/app/_components/product/detail/ProductInfo";
import { Loader } from "@/app/_components/common/Loader";
import { useProduct } from "@/app/_hooks/useProductDetail";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const {
    product,
    isLoading,
    error,
    isLikeProcessing,
    likeStatus,
    handleCommentSubmit,
    handleCommentUpdate,
    handleCommentDelete,
    handleLikeClick,
  } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-secondary-600">상품을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {error && (
        <div className="bg-error-50 fixed left-0 right-0 top-0 z-50 p-4 text-center text-sm text-error-red">
          {error}
        </div>
      )}

      <div className="mx-auto max-w-[1200px] p-4">
        <div className="flex flex-col gap-8 tablet:flex-row">
          <ProductImages images={product.images} title={product.title} />

          <div className="flex-1">
            <ProductInfo
              product={product}
              onLikeClick={handleLikeClick}
              isLiked={likeStatus?.liked ?? false}
              isLikeProcessing={isLikeProcessing}
            />
          </div>
        </div>

        <div className="mt-8 border-t border-secondary-100">
          <CommentSection
            type="product"
            backUrl="/product"
            comments={product.comments}
            count={product._count.comments}
            onCommentSubmit={handleCommentSubmit}
            onCommentUpdate={handleCommentUpdate}
            onCommentDelete={handleCommentDelete}
          />
        </div>
      </div>
    </div>
  );
}
