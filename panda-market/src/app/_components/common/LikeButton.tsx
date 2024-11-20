"use client";

import { useState, useEffect } from "react";
import { api } from "@/app/_trpc/client";
import { Heart, Eye } from "lucide-react";
import { useSession } from "next-auth/react";
import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;

interface BaseLikeButtonProps {
  id: string;
  initialLikeCount: number;
  views: number;
}

interface PostLikeButtonProps extends BaseLikeButtonProps {
  type: "post";
}

interface ProductLikeButtonProps extends BaseLikeButtonProps {
  type: "product";
}

type LikeButtonProps = PostLikeButtonProps | ProductLikeButtonProps;

export const LikeButton = ({
  id,
  type,
  initialLikeCount,
  views,
}: LikeButtonProps) => {
  const { data: session } = useSession();
  const utils = api.useUtils();

  const [optimisticCount, setOptimisticCount] = useState(initialLikeCount);
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);

  const likeStatusQuery =
    type === "post"
      ? api.post.getLikeStatus.useQuery(
          { postId: id },
          {
            retry: false,
            refetchOnWindowFocus: false,
            enabled: !!session,
          },
        )
      : api.product.getLikeStatus.useQuery(
          { productId: id },
          {
            retry: false,
            refetchOnWindowFocus: false,
            enabled: !!session,
          },
        );

  const [optimisticLiked, setOptimisticLiked] = useState(
    likeStatusQuery.data?.liked ?? false,
  );

  useEffect(() => {
    setOptimisticLiked(likeStatusQuery.data?.liked ?? false);
  }, [likeStatusQuery.data?.liked]);

  const { mutate: toggleLike } = (
    type === "post" ? api.post.toggleLike : api.product.toggleLike
  ).useMutation({
    onMutate: async () => {
      setIsLikeProcessing(true);

      const prevData =
        type === "post"
          ? utils.post.getLikeStatus.getData({ postId: id })
          : utils.product.getLikeStatus.getData({ productId: id });

      if (type === "post") {
        await utils.post.getLikeStatus.cancel({ postId: id });
      } else {
        await utils.product.getLikeStatus.cancel({ productId: id });
      }

      const newLikedState = !optimisticLiked;
      setOptimisticLiked(newLikedState);
      setOptimisticCount((prev) => (newLikedState ? prev + 1 : prev - 1));

      return { prevData };
    },

    onSuccess: async () => {
      if (type === "post") {
        await Promise.all([
          utils.post.getLikeStatus.invalidate({ postId: id }),
          utils.post.list.invalidate(),
        ]);
      } else {
        await Promise.all([
          utils.product.getLikeStatus.invalidate({ productId: id }),
          utils.product.list.invalidate(),
        ]);
      }
    },

    onError: (_, __, context) => {
      setOptimisticLiked(likeStatusQuery.data?.liked ?? false);
      setOptimisticCount(initialLikeCount);

      if (context?.prevData) {
        if (type === "post") {
          void utils.post.getLikeStatus.setData(
            { postId: id },
            context.prevData,
          );
        } else {
          void utils.product.getLikeStatus.setData(
            { productId: id },
            context.prevData,
          );
        }
      }
    },

    onSettled: () => {
      setIsLikeProcessing(false);
    },
  });

  const onLikeClick = async () => {
    if (!session) return;
    toggleLike(id);
  };

  return (
    <div className="mt-4 flex items-center gap-4">
      <button
        onClick={() => void onLikeClick()}
        disabled={isLikeProcessing || !session}
        className={`flex items-center rounded-full bg-secondary-100 p-1 text-sm transition-colors hover:bg-secondary-200 ${
          isLikeProcessing ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            optimisticLiked
              ? "fill-[#FF68CC] text-[#FF68CC]"
              : "text-secondary-500"
          }`}
        />
        <span className="ml-1">
          {isLikeProcessing ? "처리중..." : `좋아요 ${optimisticCount}`}
        </span>
      </button>
      <div className="flex items-center text-sm text-secondary-600">
        <Eye className="h-4 w-4" />
        <span className="ml-1">{views}</span>
      </div>
    </div>
  );
};
