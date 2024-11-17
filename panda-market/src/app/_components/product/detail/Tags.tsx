interface TagsProps {
  tags: string[];
}

export function Tags({ tags }: TagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="rounded-full bg-secondary-50 px-3 py-1 text-sm text-secondary-600 hover:bg-secondary-100"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
