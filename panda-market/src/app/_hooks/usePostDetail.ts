import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "@/app/_trpc/client";
import { usePostMutations } from "../_mutations/postMutations";
import type { EditPostData, Post } from "@/app/_types/post";
import type { Session } from "next-auth";

interface UsePostReturn {
  post: Post | null | undefined;
  isLoading: boolean;
  error: string | null;
  session: Session | null;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  handleEdit: (editData: EditPostData) => Promise<void>;
  handleDelete: () => Promise<void>;
  handleCommentSubmit: (content: string) => Promise<void>;
  handleCommentUpdate: (commentId: string, content: string) => Promise<void>;
  handleCommentDelete: (commentId: string) => Promise<void>;
  commentMutationsLoading: boolean;
}

const handleError = (error: unknown, defaultMessage: string): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return defaultMessage;
};

export const usePost = (postId: string): UsePostReturn => {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
  } = usePostMutations(postId);

  const { data: post, isLoading } = api.post.getById.useQuery(postId, {
    enabled: !!postId,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const handleEdit = async (editData: EditPostData) => {
    try {
      await updatePost.mutateAsync({
        id: postId,
        ...editData,
      });
      setIsEditModalOpen(false);
    } catch (error) {
      const message = handleError(error, "게시글 수정 중 오류가 발생했습니다.");
      console.error("게시글 수정 중 오류:", message);
      setError(message);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(postId);
      router.push("/community");
    } catch (error) {
      const message = handleError(error, "게시글 삭제 중 오류가 발생했습니다.");
      console.error("게시글 삭제 중 오류:", message);
      setError(message);
    }
  };

  const handleCommentSubmit = async (content: string) => {
    if (!session) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      await createComment.mutateAsync({
        postId,
        content: content.trim(),
      });
    } catch (error) {
      const message = handleError(error, "댓글 작성 중 오류가 발생했습니다.");
      console.error("댓글 작성 중 오류:", message);
      setError(message);
    }
  };

  const handleCommentUpdate = async (commentId: string, content: string) => {
    try {
      await updateComment.mutateAsync({
        id: commentId,
        content: content.trim(),
      });
    } catch (error) {
      const message = handleError(error, "댓글 수정 중 오류가 발생했습니다.");
      console.error("댓글 수정 중 오류:", message);
      setError(message);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      await deleteComment.mutateAsync(commentId);
    } catch (error) {
      const message = handleError(error, "댓글 삭제 중 오류가 발생했습니다.");
      console.error("댓글 삭제 중 오류:", message);
      setError(message);
    }
  };

  useEffect(() => {
    if (!isLoading && !post) {
      setError("존재하지 않는 게시글입니다.");
      setTimeout(() => {
        router.push("/community");
      }, 1500);
    }
  }, [isLoading, post, router]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const commentMutationsLoading: boolean =
    createComment.isLoading ||
    updateComment.isLoading ||
    deleteComment.isLoading;

  return {
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
  };
};
