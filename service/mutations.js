import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  createArticleComment,
  createProduct,
  deleteArticleById,
  updateArticleById,
} from "./api/article";
import { articleKey, productKey } from "@/variables/queryKeys";
import { useRouter } from "next/router";
import { useParams, usePathname } from "next/navigation";
import { deleteCommentById, updateCommentById } from "./api/comments";
import {
  createProductComment,
  deleteProductById,
  updateProductById,
} from "./api/product";

//to create product or article
export function useCreateMutation({ entity }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const apiFunction = entity === "article" ? createArticle : createProduct;
  const path = entity === "article" ? "forum" : "products";

  return useMutation({
    mutationFn: (newArticle) => apiFunction(newArticle),
    onSuccess: (data) => {
      if (data.id) {
        router.push(`/${path}/${data.id}`);
      }

      queryClient.invalidateQueries(articleKey.lists());
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}

//to update article or product

export function useUpdateMutation({ entity, id }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const apiFunction =
    entity === "article" ? updateArticleById : updateProductById;
  const path = entity === "article" ? "forum" : "products";
  const queryKey = entity === "article" ? articleKey.list : productKey.list;

  return useMutation({
    mutationFn: (updateData) => apiFunction(id, updateData),
    onSuccess: (data) => {
      if (data.id) {
        router.push(`/${path}/${data.id}`);
      }
      queryClient.invalidateQueries({ queryKey: queryKey() });
    },
  });
}

export function useDeleteMutation(entity) {
  const queryClient = useQueryClient();

  let queryKey;
  let deleteApi;

  if (entity === "article") {
    queryKey = articleKey.details();
    deleteApi = deleteArticleById;
  } else if (entity == "product") {
    queryKey = productKey.details();
    deleteApi = deleteProductById;
  }

  return useMutation({
    mutationFn: (idPath) => deleteApi(idPath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });

      console.log("queryKey:", queryKey);
    },
  });
}

export function useDeleteComment({ whichComment, idPath }) {
  const queryClient = useQueryClient();

  const queryKey =
    whichComment === "article" ? articleKey.comments : productKey.comments;

  return useMutation({
    mutationFn: (commentId) => {
      console.log(commentId);

      return deleteCommentById(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey(idPath));

      console.log("queryKey:", queryKey);
    },
  });
}

//comments
export function useCreateComment({ idPath, whichComment }) {
  const queryClient = useQueryClient();
  const isArticle = whichComment === "article";
  const queryKey = isArticle ? articleKey.comments : productKey.comments;
  const apiFunction = isArticle ? createArticleComment : createProductComment;

  return useMutation({
    mutationFn: (data) => apiFunction(idPath, data),
    onSuccess: () => {
      console.log("successMutation: create an comment");
      queryClient.invalidateQueries({
        queryKey: queryKey(idPath),
      });
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
  });
}
