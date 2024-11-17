import { useState } from "react";
import { useSession } from "next-auth/react";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  isSubmitting?: boolean;
  placeholder?: string;
}

export function CommentForm({
  onSubmit,
  isSubmitting = false,
  placeholder = "댓글을 입력해주세요",
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!content.trim() || isSubmitting) return;

    try {
      await onSubmit(content);
      setContent("");
    } catch (error) {
      console.error("작성 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-secondary-100 p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={session ? placeholder : "로그인 후 작성할 수 있습니다"}
        disabled={!session || isSubmitting}
        className="h-24 w-full resize-none rounded-lg border border-secondary-200 p-3 text-sm outline-none focus:border-primary-100 disabled:bg-secondary-50"
        maxLength={500}
      />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-secondary-400">{content.length}/500</span>
        <button
          type="submit"
          disabled={!session || !content.trim() || isSubmitting}
          className="rounded-lg bg-primary-100 px-4 py-2 text-sm font-bold text-white hover:bg-primary-200 disabled:bg-secondary-200"
        >
          {isSubmitting ? "등록 중..." : "작성하기"}
        </button>
      </div>
    </form>
  );
}
