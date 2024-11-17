import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import type {
  Comment,
  PostComment,
  ProductComment,
} from "@/app/_types/comment";

type CommentType = "post" | "product";

type DBComment = {
  author: {
    id: string;
    image: string | null;
    name: string | null;
  };
  postId: string | null;
  productId: string | null;
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

interface CommentSectionProps {
  type: CommentType;
  comments: DBComment[];
  count: number;
  onCommentSubmit: (content: string) => Promise<void>;
  onCommentUpdate: (commentId: string, content: string) => Promise<void>;
  onCommentDelete: (commentId: string) => Promise<void>;
  backUrl: string;
  isLoading?: boolean;
}

// UI 관련 설정
const UI_CONFIG = {
  post: {
    title: "댓글",
    placeholder: "댓글을 입력해주세요",
    emptyMessage: "아직 댓글이 없어요",
    emptyImageSrc: "/images/placeholder-no-reply.svg",
  },
  product: {
    title: "문의하기",
    placeholder: "문의하실 사항을 입력해주세요",
    emptyMessage: "아직 문의가 없어요",
    emptyImageSrc: "/images/placeholder-no-inquire.svg",
  },
} as const;

// 댓글 변환 로직
const transformToComment = (
  dbComment: DBComment,
  type: CommentType,
): Comment => {
  if (type === "post") {
    return {
      ...dbComment,
      postId: dbComment.postId ?? "",
      productId: null,
    } as PostComment;
  }

  return {
    ...dbComment,
    productId: dbComment.productId ?? "",
    postId: null,
  } as ProductComment;
};

export function CommentSection({
  type,
  comments,
  count,
  onCommentSubmit,
  onCommentUpdate,
  onCommentDelete,
  backUrl,
  isLoading = false,
}: CommentSectionProps) {
  const config = UI_CONFIG[type];
  const transformedComments = comments.map((comment) =>
    transformToComment(comment, type),
  );

  return (
    <div className="bg-white">
      <header className="border-b border-secondary-100 px-4 py-3">
        <h2 className="text-base font-bold">
          {config.title} <span className="text-primary-100">{count}</span>
        </h2>
      </header>

      <CommentForm
        onSubmit={onCommentSubmit}
        isSubmitting={isLoading}
        placeholder={config.placeholder}
      />

      <CommentList
        comments={transformedComments}
        onUpdate={onCommentUpdate}
        onDelete={onCommentDelete}
        emptyMessage={config.emptyMessage}
        emptyImageSrc={config.emptyImageSrc}
      />

      <footer className="flex items-center justify-center py-4">
        <Link href={backUrl}>
          <span className="flex max-w-[260px] items-center justify-center gap-[8px] rounded-[40px] bg-primary-100 px-[40px] py-[12px] text-secondary-100 hover:bg-primary-200">
            목록으로 돌아가기 <Undo2 />
          </span>
        </Link>
      </footer>
    </div>
  );
}
