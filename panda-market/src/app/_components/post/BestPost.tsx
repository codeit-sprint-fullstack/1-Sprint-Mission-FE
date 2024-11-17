"use client";

import { Trophy, Heart } from "lucide-react";
import { api } from "@/app/_trpc/client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const BestPosts = () => {
  const { data: bestPosts } = api.post.list.useQuery({
    page: 1,
    limit: 3,
    sort: "likes",
  });

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.matchMedia("(min-width: 1200px)").matches) {
        setVisibleCount(3);
      } else if (window.matchMedia("(min-width: 744px)").matches) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handleImageError = (postId: string) => {
    setImageErrors((prev) => ({
      ...prev,
      [postId]: true,
    }));
  };

  if (!bestPosts?.items.length) return null;

  const items = bestPosts.items.slice(0, visibleCount);

  const renderImage = (post: (typeof items)[0]) => {
    if (!post.images?.[0]) return null;

    if (imageErrors[post.id]) {
      return (
        <div className="h-[72px] w-[72px] overflow-hidden rounded-2xl border border-secondary-200">
          <Image
            src="/images/placeholder-no-image.svg"
            alt="이미지 로드 실패"
            className="h-full w-full object-cover"
            width={72}
            height={72}
          />
        </div>
      );
    }

    return (
      <div className="h-[72px] w-[72px] overflow-hidden rounded-2xl border border-secondary-200">
        <Image
          src={post.images[0]}
          alt=""
          className="h-full w-full object-cover"
          width={72}
          height={72}
          onError={() => handleImageError(post.id)}
        />
      </div>
    );
  };

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-bold">베스트 게시글</h2>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 pc:grid-cols-3">
        {items.map((post) => (
          <Link
            href={`/community/${post.id}`}
            key={post.id}
            className="flex flex-col rounded-2xl bg-secondary-50 px-6 transition-all hover:bg-secondary-100"
          >
            {/* Best Badge */}
            <div className="mb-4 inline-flex w-fit items-center gap-1 rounded-b-[16px] bg-primary-100 px-6 py-1 text-white">
              <Image
                alt="트로피"
                src="/icons/icon-best-post.svg"
                width={16}
                height={16}
              />
              <span className="font-medium">Best</span>
            </div>

            {/* Content */}
            <div className="mb-2 flex flex-1 flex-col gap-2">
              <div className="mb-2 flex flex-1 flex-col gap-2">
                <div className="flex justify-between gap-2">
                  <h3 className="mb-4 text-xl font-medium leading-tight text-secondary-900">
                    {post.title}
                  </h3>
                  {renderImage(post)}
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-secondary-500">
                      {post.author.name}
                    </span>
                    <span className="flex items-center justify-center gap-1">
                      <Heart
                        className="text-secondary-500"
                        width={16}
                        height={16}
                      />
                      <span className="text-[14px] text-secondary-500">
                        {post._count.likes > 9999 ? "9999+" : post._count.likes}
                      </span>
                    </span>
                  </div>
                  <span className="text-[14px] text-secondary-400">
                    {new Date(post.createdAt)
                      .toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\./g, ".")}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestPosts;
