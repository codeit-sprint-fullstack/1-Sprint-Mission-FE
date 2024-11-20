import { Comment } from "./Comment";
import Image from "next/image";
import type { Comment as CommentType } from "@/app/_types/comment";

interface CommentListProps {
  comments: CommentType[];
  onUpdate: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  emptyMessage?: string;
  emptyImageSrc?: string;
}

export function CommentList({
  comments,
  onUpdate,
  onDelete,
  emptyMessage = "댓글이 없습니다",
  emptyImageSrc = "/images/placeholder-no-reply.svg",
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center p-8 text-center text-secondary-500">
        <Image
          src={emptyImageSrc}
          width={140}
          height={140}
          alt="빈 상태 이미지"
          className="pc:h-[196px] pc:w-[196px]"
        />
        <span className="text-[16px] font-[400] text-secondary-400">
          {emptyMessage}
        </span>
      </div>
    );
  }

  return (
    <div className="divide-y divide-secondary-100">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
