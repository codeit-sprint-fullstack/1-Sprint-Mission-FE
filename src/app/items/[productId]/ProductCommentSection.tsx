"use client";

import { useState } from "react";
import classNames from "classnames";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  createProductComment,
  getProductCommentList,
  modifyComment,
  deleteComment,
} from "src/lib/api-product-comment";

import ProductCommentMaker from "./ProductCommentMaker";
import CommentList from "src/app/components/CommentList";
import Loading from "src/app/components/Loading";

import { CommentData } from "src/types/comment";
import { orderBy } from "lodash";

interface ProductCommentSectionProps {
  productId: string;
}

export default function ProductCommentSection({
  productId,
}: ProductCommentSectionProps) {
  // 임시 설정값
  const [params, setParams] = useState({
    page: 1,
    pageSize: 100,
    orderBy: "recent",
  });
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`product-comments`, productId, JSON.stringify(params)],
    queryFn: async () => {
      const result = await getProductCommentList({ productId, ...params });
      return result;
    },
    placeholderData: { totalCount: 0, comments: [] },
    staleTime: 5000,
  });

  if (isError) {
    console.error("Query Error:", error);
  }

  const list = data?.comments ?? [];

  const updateMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => modifyComment({ commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`product-comments`, productId, JSON.stringify(params)],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`product-comments`, productId, JSON.stringify(params)],
      });
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (content: string) =>
      createProductComment({ productId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`product-comments`, productId, JSON.stringify(params)],
      });
    },
  });

  const commentMakerFrameClass = classNames("mt-[3.2rem]", "ta:mt-[4rem]");
  const commentListFrameClass = classNames("mt-[4rem]]", "mo:mt-[2.4rem]");

  const handleUpdateComment = ({
    commentId,
    content,
  }: {
    commentId: string;
    content: string;
  }) => {
    updateMutation.mutate({ commentId, content });
  };

  const handleDeleteComment = (commentId: string) => {
    deleteMutation.mutate(commentId);
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading comments</div>;
  }

  return (
    <>
      <div className={commentMakerFrameClass}>
        <ProductCommentMaker addComment={addCommentMutation.mutate} />
      </div>
      <div className={commentListFrameClass}>
        <CommentList
          list={list}
          updateComment={handleUpdateComment}
          deleteComment={handleDeleteComment}
        />
      </div>
    </>
  );
}
