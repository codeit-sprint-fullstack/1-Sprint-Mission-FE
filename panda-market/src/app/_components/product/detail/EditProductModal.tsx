import { useState, MouseEvent } from "react";
import { Status } from "@prisma/client";
import { ImageUploader } from "../productRegistration/ImageUploader";
import { TagInput } from "../productRegistration/TagInput";
import type { ProductDetail } from "@/app/_types/product";
import { useCloudinaryUpload } from "@/app/_hooks/useCloudinaryUpload";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editData: EditProductData) => Promise<void>;
  product: ProductDetail;
}

interface EditProductData {
  title: string;
  description: string;
  price: number;
  images: string[];
  status: Status;
  tags: string[];
}

export function EditProductModal({
  isOpen,
  onClose,
  onSubmit,
  product,
}: EditProductModalProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editData, setEditData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    images: product.images,
    status: product.status,
    tags: product.tags ?? [],
  });

  const { uploadImage } = useCloudinaryUpload();

  if (!isOpen) return null;

  const handleImageUpload = (imageUrl: string) => {
    setEditData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrl],
    }));
  };

  const handleImageRemove = (index: number) => {
    setEditData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleTagAdd = (tag: string) => {
    if (!editData.tags.includes(tag)) {
      setEditData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const handleTagRemove = (tag: string) => {
    setEditData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploadProgress(1);
      const imageUrl = await uploadImage(file);
      handleImageUpload(imageUrl);
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
      setUploadProgress(0);
    }
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-lg rounded-lg bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold">상품 수정</h2>

        <div className="space-y-4">
          <ImageUploader
            images={editData.images}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
            uploadProgress={uploadProgress}
            onFileSelect={handleFileUpload}
          />

          <div>
            <label className="mb-1 block text-sm font-medium">제목</label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full rounded-lg border border-secondary-200 px-4 py-2 focus:border-primary-100 focus:outline-none"
              maxLength={100}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">가격</label>
            <input
              type="number"
              value={editData.price}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
              className="w-full rounded-lg border border-secondary-200 px-4 py-2 focus:border-primary-100 focus:outline-none"
              min={0}
              step={100}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">설명</label>
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="h-32 w-full rounded-lg border border-secondary-200 px-4 py-2 focus:border-primary-100 focus:outline-none"
            />
          </div>

          <div>
            <TagInput
              tags={editData.tags}
              onAddTag={handleTagAdd}
              onRemoveTag={handleTagRemove}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">상태</label>
            <select
              value={editData.status}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  status: e.target.value as Status,
                }))
              }
              className="w-full rounded-lg border border-secondary-200 px-4 py-2 focus:border-primary-100 focus:outline-none"
            >
              <option value={Status.AVAILABLE}>판매중</option>
              <option value={Status.SOLD}>판매완료</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-secondary-600 hover:bg-secondary-50"
            >
              취소
            </button>
            <button
              onClick={() => onSubmit(editData)}
              className="rounded-lg bg-primary-100 px-4 py-2 text-sm font-bold text-white hover:bg-primary-200"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
