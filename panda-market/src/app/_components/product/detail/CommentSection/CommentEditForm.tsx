import { useState } from "react";

interface CommentEditFormProps {
  initialContent: string;
  onSubmit: (content: string) => Promise<void>;
  onCancel: () => void;
}

export function CommentEditForm({
  initialContent,
  onSubmit,
  onCancel,
}: CommentEditFormProps) {
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(content);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="h-[88px] w-full resize-none rounded-lg border border-secondary-200 p-3 text-sm outline-none focus:border-primary-100"
        disabled={isSubmitting}
      />
      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-3 py-1 text-sm text-secondary-600 hover:bg-secondary-50"
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="rounded-lg bg-primary-100 px-3 py-1 text-sm text-white hover:bg-primary-200 disabled:bg-secondary-200"
        >
          {isSubmitting ? "수정 중..." : "수정하기"}
        </button>
      </div>
    </form>
  );
}
