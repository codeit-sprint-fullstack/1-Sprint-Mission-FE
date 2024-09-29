import {
  createArticle,
  createArticleComment,
  deleteArticleById,
  updateArticleById,
} from "@/service/api/article";
import { articleKey, productKey } from "./queryKeys";
import {
  createProduct,
  createProductComment,
  deleteProductById,
  updateProductById,
} from "@/service/api/product";
import { deleteCommentById, updateCommentById } from "@/service/api/comments";

export const ENTITY = {
  ARTICLE: "article",
  PRODUCT: "product",
  COMMENT: "comment",
};

const CONFIG = {
  article: {
    path: "/forum",
    name: "게시글",
    key: articleKey,
    createComment: createArticleComment,
    delete: deleteArticleById,
    edit: updateArticleById,
    create: createArticle,
  },
  product: {
    path: "/products",
    name: "상품",
    key: productKey,
    createComment: createProductComment,
    delete: deleteProductById,
    edit: updateProductById,
    create: createProduct,
  },
  comment: {
    name: "댓글",
    delete: deleteCommentById,
    edit: updateCommentById,
  },
};

export const DELETE = (entity) => {
  return {
    path: CONFIG[entity].path,
    deleteMessage: `${CONFIG[entity].name}을 삭제하시겠습니까?`,
    successMessage: `${CONFIG[entity].name}이 삭제되었습니다.`,
    queryKey: () => CONFIG[entity].key.details(),
    delete: CONFIG[entity].delete,
  };
};

export const CREATE_EDIT = (entity) => {
  return {
    path: CONFIG[entity].path,
    mutatePath: `${CONFIG[entity].path}/registration`,
    queryKey: () => CONFIG[entity].key.list(),
    edit: CONFIG[entity].edit,
    create: CONFIG[entity].create,
  };
};

export const MUTATE_COMMENT = (entity) => {
  return {
    queryKey: (idPath) => CONFIG[entity].key.comments(idPath),
    create: CONFIG[entity].createComment,
    delete: CONFIG.comment.delete,
    edit: CONFIG.comment.edit,
  };
};
