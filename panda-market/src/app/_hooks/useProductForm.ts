import { useState } from "react";
import { useCloudinaryUpload } from "@/app/_hooks/useCloudinaryUpload";
import {
  useProductFormMutations,
  type ProductFormData,
} from "../_mutations/productFormMutations";

interface UseProductFormReturn {
  formData: ProductFormData;
  tags: string[];
  isSubmitting: boolean;
  uploadProgress: number;
  error: string | null;
  handleImageUpload: (imageUrl: string) => void;
  handleImageRemove: (index: number) => void;
  handleFileUpload: (file: File) => Promise<void>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleFormChange: (
    field: keyof Omit<ProductFormData, "images" | "tags">,
    value: string,
  ) => void;
  handleTagAdd: (tag: string) => void;
  handleTagRemove: (tag: string) => void;
}

export const useProductForm = (): UseProductFormReturn => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    price: "",
    images: [],
    tags: [],
  });
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const { uploadImage } = useCloudinaryUpload();
  const { createProduct } = useProductFormMutations();

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrl],
    }));
  };

  const handleImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
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
      const message =
        error instanceof Error
          ? error.message
          : "이미지 업로드에 실패했습니다.";
      console.error("이미지 업로드 실패:", message);
      setError(message);
      setUploadProgress(0);
    }
  };

  const validateForm = (): boolean => {
    if (formData.images.length === 0) {
      setError("최소 1개의 상품 이미지를 업로드해주세요.");
      return false;
    }

    if (!formData.title.trim()) {
      setError("상품명을 입력해주세요.");
      return false;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      setError("올바른 가격을 입력해주세요.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createProduct.mutateAsync({
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        images: formData.images,
        tags: tags,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "상품 등록에 실패했습니다.";
      console.error("상품 등록 실패:", message);
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (
    field: keyof Omit<ProductFormData, "images" | "tags">,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagAdd = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return {
    formData,
    tags,
    isSubmitting,
    uploadProgress,
    error,
    handleImageUpload,
    handleImageRemove,
    handleFileUpload,
    handleSubmit,
    handleFormChange,
    handleTagAdd,
    handleTagRemove,
  };
};
