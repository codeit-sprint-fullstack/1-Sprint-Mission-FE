"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import type { ProductDetail } from "@/app/_types/product";
import { ConfirmModal } from "@/app/_components/common/ConfirmModal";
import { MoreMenu } from "@/app/_components/common/MoreMenu";

interface CommentProps {
  comment: ProductDetail["comments"][0];
  onUpdate: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
}

export function Comment({ comment, onUpdate, onDelete }: CommentProps) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isOwner = session?.user?.id === comment.authorId;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    try {
      setIsSubmitting(true);
      await onUpdate(comment.id, editContent);
      setIsEditing(false);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      await onDelete(comment.id);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    } finally {
      setIsSubmitting(false);
      setIsDeleteModalOpen(false);
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

  if (isEditing) {
    return (
      <form
        onSubmit={handleUpdate}
        className="border-b border-secondary-100 p-4"
      >
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={comment.author.image ?? "/icons/icon-user-profile.svg"}
              alt={comment.author.name ?? "사용자"}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium">{comment.author.name}</span>
        </div>
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="mt-2 h-24 w-full resize-none rounded-lg border border-secondary-200 p-3 text-sm outline-none focus:border-primary-100"
          maxLength={500}
          disabled={isSubmitting}
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-secondary-400">
            {editContent.length}/500
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSubmitting}
              className="rounded-lg px-3 py-1 text-sm text-secondary-600 hover:bg-secondary-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!editContent.trim() || isSubmitting}
              className="rounded-lg bg-primary-100 px-3 py-1 text-sm text-white hover:bg-primary-200"
            >
              {isSubmitting ? "수정 중..." : "수정하기"}
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <>
      <div className="group relative border-b border-secondary-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={comment.author.image ?? "/icons/icon-user-profile.svg"}
                alt={comment.author.name ?? "사용자"}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-medium">{comment.author.name}</span>
          </div>
          {isOwner && !isSubmitting && (
            <MoreMenu items={moreMenuItems} buttonClassName="p-2" />
          )}
        </div>
        <p className="mt-2 whitespace-pre-wrap text-sm text-secondary-600">
          {comment.content}
        </p>
        <p className="mt-1 text-xs text-secondary-400">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="댓글 삭제"
        message="댓글을 삭제하시겠어요 ?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        variant="danger"
      />
    </>
  );
}
