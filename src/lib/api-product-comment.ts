import { instance } from "./axios-token";

export async function createProductComment({
  productId,
  content,
}: {
  productId: string;
  content: string;
}) {
  const path = `/product-comments`;
  const data = { productId, content };

  try {
    const res = await instance.post(path, data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getProductCommentList({
  productId,
  page = 1,
  pageSize = 100,
  orderBy = "",
}: {
  productId: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
}) {
  const path = `/product/${productId}/comments`;
  const params = {
    ...(page && { page }),
    ...(pageSize && { pageSize }),
    ...(orderBy && { orderBy }),
  };

  try {
    const res = await instance.get(path, { params });
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export async function getProductComment(productId: string) {
  const path = `/product-comments/${productId}`;

  try {
    const res = await instance.get(path);
    return res.data;
  } catch (err) {
    console.error("getProductComment err : ", err);
  }
}

export async function modifyComment({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) {
  const path = `/product-comments/${commentId}`;
  const data = { content };

  try {
    const res = await instance.patch(path, data);
    return res.data;
  } catch (err) {
    console.error("modifyComment err : ", err);
  }
}

export async function deleteComment(commentId: string) {
  const path = `/product-comments/${commentId}`;

  try {
    const res = await instance.delete(path);
    return res.data;
  } catch (err) {
    console.error("deleteComment err : ", err);
  }
}
