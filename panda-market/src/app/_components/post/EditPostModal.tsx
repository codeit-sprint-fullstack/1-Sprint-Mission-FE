"use client";

import { useState, MouseEvent } from "react";
import { ImageUploader } from "../product/productRegistration/ImageUploader";
import { useCloudinaryUpload } from "@/app/_hooks/useCloudinaryUpload";
import type { Post, EditPostData } from "@/app/_types/post";

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (editData: EditPostData) => Promise<void>;
  post: Post;
}

export function EditPostModal({
  isOpen,
  onClose,
  onSubmit,
  post,
}: EditPostModalProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editData, setEditData] = useState({
    title: post.title,
    content: post.content,
    images: post.images,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(editData);
      onClose();
    } catch (error) {
      console.error("게시글 수정 실패:", error);
    } finally {
      setIsSubmitting(false);
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
        className="w-full max-w-2xl rounded-lg bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-bold text-secondary-800">
          게시글 수정
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-secondary-700">
              제목
            </label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full rounded-lg border border-secondary-200 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              maxLength={100}
              placeholder="제목을 입력하세요"
            />
            <p className="mt-1 text-sm text-secondary-500">
              {editData.title.length}/100
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-secondary-700">
              내용
            </label>
            <textarea
              value={editData.content}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={10}
              className="w-full rounded-lg border border-secondary-200 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="내용을 입력하세요"
            />
          </div>

          <ImageUploader
            images={editData.images}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
            uploadProgress={uploadProgress}
            onFileSelect={handleFileUpload}
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-secondary-600 hover:bg-secondary-50"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !editData.title.trim() ||
                !editData.content.trim()
              }
              className="rounded-lg bg-primary-100 px-4 py-2 text-sm font-bold text-white hover:bg-primary-200 disabled:bg-secondary-200"
            >
              {isSubmitting ? "수정 중..." : "수정하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
