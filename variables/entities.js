import {
  createArticle,
  createArticleComment,
  deleteArticleById,
  getArticleById,
  getArticleComments,
  getArticleList,
  updateArticleById,
} from "@/service/api/article";
import { articleKey, productKey } from "./queryKeys";
import {
  createProduct,
  createProductComment,
  deleteProductById,
  getProductById,
  getProductComments,
  getProductList,
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
    readAll: getArticleList,
    readOne: getArticleById,
    create: createArticle,
    update: updateArticleById,
    delete: deleteArticleById,
    createComment: createArticleComment,
    readComments: getArticleComments,
  },
  product: {
    path: "/products",
    name: "상품",
    key: productKey,
    readAll: getProductList,
    readOne: getProductById,
    create: createProduct,
    update: updateProductById,
    delete: deleteProductById,
    createComment: createProductComment,
    readComments: getProductComments,
  },
  comment: {
    name: "댓글",
    delete: deleteCommentById,
    update: updateCommentById,
  },
};

export const READ_ALL = (entity) => {
  return {
    path: CONFIG[entity].path,
    queryKey: (params) => CONFIG[entity].key.list(params),
    read: CONFIG[entity].readAll,
  };
};

export const READ_ONE = (entity) => {
  return {
    path: CONFIG[entity].path,
    queryKey: (id) => CONFIG[entity].key.details(id),
    read: CONFIG[entity].readOne,
  };
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

export const CREATE_UPDATE = (entity) => {
  return {
    path: CONFIG[entity].path,
    mutatePath: `${CONFIG[entity].path}/registration`,
    queryKey: () => CONFIG[entity].key.list(),
    update: CONFIG[entity].update,
    create: CONFIG[entity].create,
  };
};

export const CRUD_COMMENT = (entity) => {
  return {
    queryKey: (idPath) => CONFIG[entity].key.comments(idPath),
    create: CONFIG[entity].createComment,
    delete: CONFIG.comment.delete,
    update: CONFIG.comment.update,
    read: CONFIG[entity].readComments,
  };
};
