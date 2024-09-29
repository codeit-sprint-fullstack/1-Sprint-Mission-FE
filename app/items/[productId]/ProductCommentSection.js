"use client";

import classNames from "classnames";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProductComment,
  getProductComments,
} from "@/lib/api-codeit-comment";

import ProductCommentMaker from "./ProductCommentMaker";
import ProductCommentList from "./ProductCommentList";
import Loading from "@/app/components/Loading";

export default function ProductCommentSection({ productId }) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`product-comments`, productId],
    queryFn: () => getProductComments({ productId }),
  });

  const mutation = useMutation({
    mutationFn: ({ productId, content }) =>
      createProductComment({ productId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`product-comments`, productId],
      });
    },
  });

  const commentMakerFrameClass = classNames(
    "mt-comment-maker-frame",
    "tablet:mt-tablet-comment-maker-frame"
  );
  const commentListFrameClass = classNames(
    "mt-comment-list-frame",
    "mobile:mt-mobile-comment-list-frame"
  );

  const handleRegistComment = (newComment) => {
    mutation.mutate({ productId, content: newComment });
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
        <ProductCommentMaker registComment={handleRegistComment} />
      </div>
      <div className={commentListFrameClass}>
        <ProductCommentList data={data} />
      </div>
    </>
  );
}
