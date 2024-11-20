"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Status } from "@prisma/client";
import { api } from "@/app/_trpc/client";
import type { ProductDetail } from "@/app/_types/product";
import { ConfirmModal } from "@/app/_components/common/ConfirmModal";
import { UserInfo } from "@/app/_components/product/detail/UserInfo";
import { Tags } from "./Tags";
import { EditProductModal } from "./EditProductModal";
import { LikeButton } from "../../common/LikeButton";
import { MoreMenu } from "@/app/_components/common/MoreMenu";

interface ProductInfoProps {
  product: ProductDetail;
  onLikeClick: () => Promise<void>;
  isLiked: boolean;
  isLikeProcessing: boolean;
}

interface EditProductData {
  title: string;
  description: string;
  price: number;
  images: string[];
  status: Status;
}

export function ProductInfo({
  product,
  onLikeClick,
  isLiked,
  isLikeProcessing,
}: ProductInfoProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOwner = session?.user?.id === product.sellerId;
  const utils = api.useUtils();

  const updateMutation = api.product.update.useMutation({
    onSuccess: () => {
      setIsEditing(false);
      void utils.product.getById.invalidate(product.id);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const deleteMutation = api.product.delete.useMutation({
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleUpdate = async (editData: EditProductData) => {
    try {
      await updateMutation.mutateAsync({
        id: product.id,
        ...editData,
      });
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(product.id);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const moreMenuItems = [
    {
      label: "수정하기",
      onClick: () => setIsEditing(true),
    },
    {
      label: "삭제하기",
      onClick: () => setIsDeleteModalOpen(true),
      variant: "danger" as const,
    },
  ];

  return (
    <div className="flex h-full flex-col tablet:pl-0">
      {error && (
        <div className="bg-error-50 mb-4 rounded p-3 text-sm text-error-red">
          {error}
        </div>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-[600] text-secondary-800">
            {product.title}
          </h1>
        </div>
        {isOwner && <MoreMenu items={moreMenuItems} />}
      </div>

      <p className="text-[40px] font-[600] text-secondary-800">
        {new Intl.NumberFormat("ko-KR").format(product.price)}원
      </p>

      <LikeButton
        id={product.id}
        type="product"
        initialLikeCount={product._count.likes}
        views={product.views}
      />

      <div className="flex h-full flex-col justify-between">
        <div className="mt-6 border-t border-secondary-200 pb-4 pt-4">
          <div className="space-y-4 text-sm text-secondary-600">
            <p className="whitespace-pre-wrap">{product.description}</p>
          </div>
          <Tags tags={product.tags} />
        </div>

        <UserInfo user={product.seller} createdAt={product.createdAt} />
      </div>

      {/* 수정 모달 */}
      <EditProductModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleUpdate}
        product={product}
      />

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="상품 삭제"
        message="정말로 상품을 삭제하시겠어요?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        variant="danger"
      />
    </div>
  );
}
