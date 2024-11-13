"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPostComment,
  getPostCommentList,
} from "src/lib/api-post-comment";
import classNames from "classnames";

import PostCommentMaker from "./PostCommentMaker";
import CommentList from "src/app/components/CommentList";

export default function PostCommentSection({ postId }: { postId: string }) {
  const queryClient = useQueryClient();

  const { data: commentList } = useQuery({
    queryKey: [`post-comments`, postId],
    queryFn: () => getPostCommentList({ postId }),
  });

  const mutation = useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      createPostComment({ postId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`post-comments`, postId] });
    },
  });

  const commentMakerFrameClass = classNames(
    "mt-comment-maker-frame",
    "ta:mt-ta-comment-maker-frame"
  );
  const commentListFrameClass = classNames(
    "mt-comment-list-frame",
    "mo:mt-mo-comment-list-frame"
  );

  const handleRegistComment = (newComment: string) => {
    mutation.mutate({ postId, content: newComment });
  };

  return (
    <>
      <div className={commentMakerFrameClass}>
        <PostCommentMaker registComment={handleRegistComment} />
      </div>
      <div className={commentListFrameClass}>
        <CommentList data={{ list: commentList }} />
      </div>
    </>
  );
}
