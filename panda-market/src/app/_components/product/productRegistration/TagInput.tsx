"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export const TagInput = ({ tags, onAddTag, onRemoveTag }: TagInputProps) => {
  const [currentTag, setCurrentTag] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      onAddTag(currentTag.trim());
      setCurrentTag("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTag.trim()) {
      onAddTag(currentTag.trim());
      setCurrentTag("");
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">태그</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-secondary-100 px-3 py-1"
          >
            #{tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="text-secondary-500 hover:text-secondary-700"
            >
              <X width={14} height={14} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="태그를 입력해주세요"
          className="border-secondary-300 flex-1 rounded-lg border px-4 py-2 focus:border-primary-100 focus:outline-none"
        />
      </div>
    </div>
  );
};
