"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/common/SmallBtn";
import { ImageUploader } from "@/app/_components/product/productRegistration/ImageUploader";
import { LoaderWithContainer } from "@/app/_components/common/Loader";
import { AuthRequiredModal } from "@/app/_components/common/AuthRequireModal";
import { usePostForm } from "@/app/_hooks/usePostForm";

export default function PostRegisterPage() {
  const router = useRouter();
  const {
    status,
    formData,
    images,
    uploadProgress,
    showAuthModal,
    isUploading,
    createPost,
    pathname,
    handleImageRemove,
    handleFileSelect,
    handleSubmit,
    handleFormChange,
    setShowAuthModal,
  } = usePostForm();

  const handleModalClose = () => {
    setShowAuthModal(false);
    router.push("/community");
  };

  if (status === "loading") {
    return (
      <div>
        <LoaderWithContainer height="h-[300px]" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>게시글 작성</title>
        <meta name="description" content="새로운 게시글 작성" />
      </Head>

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={handleModalClose}
        returnUrl={pathname}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-secondary-800">
              게시글 작성
            </h1>
            <Button mode="48" href="/community" className="px-2">
              목록으로
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-secondary-700"
              >
                제목
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                maxLength={100}
                className="w-full rounded-lg border border-secondary-200 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="제목을 입력하세요"
              />
              <p className="mt-1 text-sm text-secondary-500">
                {formData.title.length}/100
              </p>
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-medium text-secondary-700"
              >
                내용
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleFormChange("content", e.target.value)}
                rows={10}
                className="w-full rounded-lg border border-secondary-200 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="내용을 입력하세요"
              />
            </div>

            <ImageUploader
              images={images}
              onImageRemove={handleImageRemove}
              uploadProgress={uploadProgress}
              onFileSelect={handleFileSelect}
            />

            <div className="flex justify-end">
              <Button
                mode="40"
                type="submit"
                disabled={
                  createPost.isLoading || isUploading || uploadProgress > 0 // 객체관련
                }
                className="w-full sm:w-auto"
              >
                {createPost.isLoading ? "작성 중..." : "작성하기"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
