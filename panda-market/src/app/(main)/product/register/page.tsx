"use client";

import React from "react";
import { ImageUploader } from "@/app/_components/product/productRegistration/ImageUploader";
import { TagInput } from "@/app/_components/product/productRegistration/TagInput";
import { useProductForm } from "@/app/_hooks/useProductForm";

const ProductRegistrationForm = () => {
  const {
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
  } = useProductForm();

  return (
    <div className="mx-auto p-12">
      <h1 className="mb-6 text-2xl font-bold">상품 등록하기</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <ImageUploader
          images={formData.images}
          onImageRemove={handleImageRemove}
          uploadProgress={uploadProgress}
          onFileSelect={handleFileUpload}
        />

        <div>
          <label className="mb-2 block text-sm font-medium">상품명</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
            placeholder="상품명을 입력해주세요"
            className="border-secondary-300 w-full rounded-lg border px-4 py-2 focus:border-primary-100 focus:outline-none"
            maxLength={100}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">상품 소개</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleFormChange("description", e.target.value)}
            placeholder="상품 소개를 입력해주세요"
            className="border-secondary-300 h-32 w-full resize-none rounded-lg border px-4 py-2 focus:border-primary-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">판매가격</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleFormChange("price", e.target.value)}
            placeholder="판매가격을 입력해주세요"
            className="border-secondary-300 w-full rounded-lg border px-4 py-2 focus:border-primary-100 focus:outline-none"
            min="0"
          />
        </div>

        <TagInput
          tags={tags}
          onAddTag={handleTagAdd}
          onRemoveTag={handleTagRemove}
        />

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-lg py-3 font-semibold ${
              isSubmitting
                ? "cursor-not-allowed bg-secondary-400"
                : "bg-primary-100 hover:bg-primary-200 active:bg-primary-300"
            } text-white`}
          >
            {isSubmitting ? "등록 중..." : "상품 등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductRegistrationForm;
