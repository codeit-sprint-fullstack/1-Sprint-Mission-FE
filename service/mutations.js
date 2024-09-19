import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle, createArticleComment } from "./api";
import { articleKey } from "@/variables/queryKeys";
import { useRouter } from "next/router";

export function useCreateArticle() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (newArticle) => createArticle(newArticle),
    onSuccess: (data) => {
      if (data.id) {
        router.push(`/forum/${data.id}`);
      }

      queryClient.invalidateQueries(articleKey.lists());
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}

export function useCreateComment(id) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createArticleComment(id, data),
    onSuccess: () => {
      console.log("onSuccess in createCommentMutation");
      queryClient.invalidateQueries({
        queryKey: articleKey.comments(id),
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
