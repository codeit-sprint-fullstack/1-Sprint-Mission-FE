import { instance } from "./axios-token";

export async function createPostComment({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) {
  const path = `/post-comments`;
  const data = { postId, content };

  try {
    const res = await instance.post(path, data);
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export async function getPostCommentList({
  postId,
  page = 1,
  pageSize = 100,
  orderBy = "",
}: {
  postId: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
}) {
  const path = `/post/${postId}/comments`;
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

export async function getPostComment(postId: string) {
  const path = `/post-comments/${postId}`;

  try {
    const res = await instance.get(path);
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export async function setPostComment({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) {
  const path = `/post-comments/${postId}`;
  const data = { content };

  try {
    const res = await instance.patch(path, data);
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export async function deletePostComment(postId: string) {
  const path = `/post-comments/${postId}`;

  try {
    const res = await instance.delete(path);
    return res.data;
  } catch (err) {
    alert(err);
  }
}
