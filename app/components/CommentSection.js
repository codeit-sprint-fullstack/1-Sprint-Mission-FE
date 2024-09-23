"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostComment, getPostComments } from "@/lib/api-post-comment";
import classNames from "classnames";

import CommentMaker from "./CommentMaker";
import CommentList from "./CommentList";

export default function CommentSection({ postId }) {
  const queryClient = useQueryClient();

  const { data: commentList } = useQuery({
    queryKey: [`comments`, postId],
    queryFn: () => getPostComments(postId),
  });

  const mutation = useMutation({
    mutationFn: ({ postId, content }) => createPostComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`comments`, postId] });
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
    mutation.mutate({ postId, content: newComment });
  };

  return (
    <>
      <div className={commentMakerFrameClass}>
        <CommentMaker registComment={handleRegistComment} />
      </div>
      <div className={commentListFrameClass}>
        <CommentList list={commentList} />
      </div>
    </>
  );
}
