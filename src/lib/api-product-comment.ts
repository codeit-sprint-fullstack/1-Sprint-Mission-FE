import axios from "axios";

import { getAccessToken } from "./token-codeit";
import { instance } from "./axios-token";

const baseURL = process.env.NEXT_PUBLIC_SPRINT_BASE_URL || "";

export async function createProductComment({
  productId,
  content,
}: {
  productId: string;
  content: string;
}) {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const token = await getAccessToken();

  const data = { productId, content };

  try {
    const res = await instance.post("/product-comments", data, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
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
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const token = await getAccessToken();

  const params = {
    ...(page && { page }),
    ...(pageSize && { pageSize }),
    ...(orderBy && { orderBy }),
  };

  try {
    const res = await instance.get(`/product/${productId}/comments`, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return res.data || { totalCount: 0, comments: [] };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return { totalCount: 0, comments: [] };
    }

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
