"use client";

import classNames from "classnames";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProductComment,
  getProductCommentList,
  modifyComment,
  deleteComment,
} from "src/lib/api-product-comment";

import ProductCommentMaker from "./ProductCommentMaker";
import CommentList from "src/app/components/CommentList";
import Loading from "src/app/components/Loading";

export default function ProductCommentSection({
  productId,
}: {
  productId: string;
}) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`product-comments`, productId],
    queryFn: () => getProductCommentList({ productId }),
  });

  const mutation = useMutation({
    mutationFn: ({
      productId,
      content,
    }: {
      productId: string;
      content: string;
    }) => createProductComment({ productId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`product-comments`, productId],
      });
    },
  });

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

  const commentMakerFrameClass = classNames(
    "mt-comment-maker-frame",
    "tablet:mt-tablet-comment-maker-frame"
  );
  const commentListFrameClass = classNames(
    "mt-comment-list-frame",
    "mobile:mt-mobile-comment-list-frame"
  );

  const handleRegistComment = (newComment: string) => {
    mutation.mutate({ productId, content: newComment });
  };

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
        <ProductCommentMaker registComment={handleRegistComment} />
      </div>
      <div className={commentListFrameClass}>
        <CommentList
          data={data}
          updateComment={handleUpdateComment}
          deleteComment={handleDeleteComment}
        />
      </div>
    </>
  );
}
