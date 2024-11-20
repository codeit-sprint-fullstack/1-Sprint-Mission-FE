"use client";

import Head from "next/head";
import { useParams } from "next/navigation";
import { PostImagesGrid } from "@/app/_components/post/PostImagesGrid";
import { LoaderWithContainer } from "@/app/_components/common/Loader";
import { LikeButton } from "@/app/_components/common/LikeButton";
import { CommentSection } from "@/app/_components/product/detail/CommentSection";
import { EditPostModal } from "@/app/_components/post/EditPostModal";
import { ConfirmModal } from "@/app/_components/common/ConfirmModal";
import { MoreMenu } from "@/app/_components/common/MoreMenu";
import { UserInfo } from "@/app/_components/product/detail/UserInfo";
import { usePost } from "@/app/_hooks/usePostDetail";

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.id as string;

  const {
    post,
    isLoading,
    error,
    session,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleEdit,
    handleDelete,
    handleCommentSubmit,
    handleCommentUpdate,
    handleCommentDelete,
    commentMutationsLoading,
  } = usePost(postId);

  if (isLoading || !post) {
    return (
      <div>
        <LoaderWithContainer height="h-[300px]" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content.slice(0, 160)} />
      </Head>

      {error && (
        <div className="bg-error-50 fixed left-0 right-0 top-0 z-50 p-4 text-center text-sm text-error-red">
          {error}
        </div>
      )}

      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        post={post}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="게시글 삭제"
        message="게시글을 삭제하시겠어요?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        variant="danger"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto">
          <div className="mb-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex flex-1">
                <h1 className="text-2xl font-bold text-secondary-800">
                  {post.title}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                {session?.user?.id === post.author.id && (
                  <MoreMenu
                    items={[
                      {
                        label: "수정하기",
                        onClick: () => setIsEditModalOpen(true),
                      },
                      {
                        label: "삭제하기",
                        onClick: () => setIsDeleteModalOpen(true),
                        variant: "danger",
                      },
                    ]}
                    buttonClassName="p-2 text-secondary-400 hover:bg-secondary-50"
                  />
                )}
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between border-b border-secondary-200 pb-4">
              <UserInfo user={post.author} createdAt={post.createdAt} />
            </div>

            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap">{post.content}</div>

              <PostImagesGrid images={post.images} title={post.title} />

              <LikeButton
                type="post"
                id={post.id}
                initialLikeCount={post._count.likes}
                views={post.views}
              />
            </div>

            <div className="mt-8">
              <CommentSection
                type="post"
                comments={post.comments}
                count={post._count.comments}
                onCommentSubmit={handleCommentSubmit}
                onCommentUpdate={handleCommentUpdate}
                onCommentDelete={handleCommentDelete}
                backUrl="/community"
                isLoading={commentMutationsLoading}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
