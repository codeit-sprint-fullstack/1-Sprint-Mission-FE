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
  commentList: CommentData[];
}

export default function ProductCommentSection({
  productId,
  commentList,
}: ProductCommentSectionProps) {
  // 임시 설정값
  const [params, setParams] = useState({
    page: 1,
    pageSize: 100,
    orderBy: "recent",
  });

  console.log("test : ", commentList);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`product-comments`, productId],
    queryFn: () => getProductCommentList({ productId, ...params }),
    placeholderData: { totalCount: 0, comments: [] },
    staleTime: 5000,
  });

  if (isError) {
    console.error("Query Error:", error);
  }

  const list = data?.comments ?? commentList ?? [];
  console.log("data : ", data);
  console.log("list : ", list);

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
        queryKey: [`product-comments`, productId],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`product-comments`, productId],
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
        <ProductCommentMaker productId={productId} />
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
