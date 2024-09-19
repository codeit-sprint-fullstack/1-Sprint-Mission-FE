import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  createArticleComment,
  deleteArticleById,
  deleteCommentById,
  updateCommentById,
} from "./api";
import { articleKey, commentKey, productKey } from "@/variables/queryKeys";
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
      console.log("successMutation: create an comment");
      queryClient.invalidateQueries({
        queryKey: articleKey.comments(id),
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}

export function useDeleteMutation({ entity, onModalClose }) {
  const queryClient = useQueryClient();

  let queryKey;
  let deleteApi;

  if (entity === "comment") {
    queryKey = commentKey.all;
    deleteApi = deleteCommentById;
  } else if (entity === "article") {
    queryKey = articleKey.details();
    deleteApi = deleteArticleById;
  }

  return useMutation({
    mutationFn: (idPath) => deleteApi(idPath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      if (onModalClose) {
        onModalClose();
      }
      console.log(queryKey);
    },
    onError: (error) => {
      console.error("Error deleting:", error.message);
    },
  });
}

export function useUpdateComment(id) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateCommentById(id, data),
    onSuccess: () => {
      console.log("successMutation:  update an comment");
      queryClient.invalidateQueries({
        queryKey: commentKey.all,
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
