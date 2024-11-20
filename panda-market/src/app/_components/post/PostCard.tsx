"use client";

import Image from "next/image";
import Link from "next/link";
import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";
import { Heart } from "lucide-react";
import { useState } from "react";

type RouterOutput = inferRouterOutputs<AppRouter>;
type PostWithRelations = RouterOutput["post"]["list"]["items"][0];

const DEFAULT_PROFILE_IMAGE = "/icons/icon-user-profile.svg";

interface PostCardProps {
  post: PostWithRelations;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const renderThumbnail = () => {
    if (!post.images[0] || imageError) {
      return <div className="h-16 w-16 flex-shrink-0" />;
    }

    return (
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={post.images[0]}
          alt=""
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  };

  return (
    <Link
      href={`/community/${post.id}`}
      className="group block h-36 w-full border-b border-secondary-200 bg-[#FCFCFC] p-4 hover:bg-secondary-100"
    >
      <div className="flex h-full items-stretch justify-between">
        <div className="flex flex-1 flex-col justify-between">
          <h2 className="line-clamp-1 text-lg font-medium text-secondary-900">
            {post.title}
          </h2>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="relative h-5 w-5">
                <Image
                  src={
                    !profileImageError
                      ? (post.author.image ?? DEFAULT_PROFILE_IMAGE)
                      : DEFAULT_PROFILE_IMAGE
                  }
                  alt={post.author.name ?? "프로필 이미지"}
                  width={20}
                  height={20}
                  className="rounded-full"
                  onError={() => setProfileImageError(true)}
                />
              </div>
              <span className="text-sm text-secondary-500">
                {post.author.name}
              </span>
              <span className="text-sm text-secondary-400">
                {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="ml-4 flex flex-col items-end justify-between">
          {renderThumbnail()}
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-secondary-500" />
            <span className="text-4 ml-2 text-secondary-500">
              {post._count.likes > 9999 ? "9999+" : post._count.likes}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
