import { useCallback, useState } from "react";
import { Status } from "@prisma/client";
import type { ProductFormData } from "@/app/_types/product";

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function ProductForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(() => ({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price ?? 0,
    images: initialData?.images ?? [],
    status: initialData?.status ?? Status.AVAILABLE,
    tags: initialData?.tags ?? [],
  }));

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormData, string>>
  >({});

  const validateForm = useCallback(() => {
    const newErrors: typeof errors = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요";
    }
    if (formData.title.length > 100) {
      newErrors.title = "제목은 100자 이내로 입력해주세요";
    }
    if (!formData.description.trim()) {
      newErrors.description = "설명을 입력해주세요";
    }
    if (formData.price < 0) {
      newErrors.price = "가격은 0원 이상이어야 합니다";
    }
    if (formData.images.length === 0) {
      newErrors.images = "이미지를 1개 이상 등록해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {initialData && (
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-bold text-secondary-900"
          >
            판매 상태
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.value as Status,
              }))
            }
            className="w-full rounded-lg border border-secondary-200 px-4 py-2 text-secondary-900 focus:border-primary-100 focus:outline-none"
          >
            <option value={Status.AVAILABLE}>판매중</option>
            <option value={Status.SOLD}>판매완료</option>
          </select>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-primary-100 px-6 py-2 font-bold text-white hover:bg-primary-200 disabled:bg-secondary-200"
        >
          {isSubmitting ? "처리중..." : initialData ? "수정하기" : "등록하기"}
        </button>
      </div>
    </form>
  );
}
