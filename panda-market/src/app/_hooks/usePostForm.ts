import { useState, type FormEvent, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCloudinaryUpload } from "@/app/_hooks/useCloudinaryUpload";
import { usePostFormMutations } from "../_mutations/postFormMutations";

interface FormData {
  title: string;
  content: string;
}

export const usePostForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { uploadImage, isUploading } = useCloudinaryUpload();

  const { createPost } = usePostFormMutations();

  useEffect(() => {
    if (status === "unauthenticated") {
      setShowAuthModal(true);
    }
  }, [status]);

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileSelect = async (file: File) => {
    if (!session) {
      setShowAuthModal(true);
      return;
    }

    try {
      setUploadProgress(10);
      const imageUrl = await uploadImage(file);
      setUploadProgress(90);
      setImages((prev) => [...prev, imageUrl]);
      setUploadProgress(100);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "이미지 업로드에 실패했습니다.";
      console.error("이미지 업로드 중 오류:", message);
      setError(message);
    } finally {
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("제목을 입력해주세요.");
      return false;
    }

    if (!formData.content.trim()) {
      setError("내용을 입력해주세요.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!session) {
      setShowAuthModal(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      await createPost.mutateAsync({
        title: formData.title.trim(),
        content: formData.content.trim(),
        images,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("게시글 작성 중 오류:", error.message);
      } else {
        setError("게시글 작성 중 오류가 발생했습니다.");
        console.error("게시글 작성 중 오류:", error);
      }
    }
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    session,
    status,
    formData,
    images,
    uploadProgress,
    error,
    showAuthModal,
    isUploading,
    createPost,
    pathname,
    handleImageRemove,
    handleFileSelect,
    handleSubmit,
    handleFormChange,
    setShowAuthModal,
  };
};
