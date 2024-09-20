import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  createArticleComment,
  deleteArticleById,
  deleteCommentById,
  updateCommentById,
} from "./api/article";
import { articleKey, commentKey, productKey } from "@/variables/queryKeys";
import { useRouter } from "next/router";
import { useParams, usePathname } from "next/navigation";

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

export function useUpdateComment(commentId) {
  const queryClient = useQueryClient();
  const params = useParams();
  const pathName = usePathname();

  const isArticle = pathName.startsWith("/forum");
  const whichId = isArticle ? params.articleId : params.productId;
  const queryKey = isArticle ? articleKey.comments : productKey.comments;

  return useMutation({
    mutationFn: (data) => updateCommentById(commentId, data),
    onSuccess: () => {
      console.log("successMutation:  update an comment");
      queryClient.invalidateQueries({
        queryKey: queryKey(whichId),
      });
      console.log(queryKey(whichId));
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
