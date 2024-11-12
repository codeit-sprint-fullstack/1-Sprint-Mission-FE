import { instance } from "./axios-token";
import { getAccessToken } from "./token-codeit";

export async function createPost({
  name,
  content,
}: {
  name: string;
  content: string;
}) {
  const path = "/posts";
  const data = { name, content };
  const headers = { authorization: `Bearer ${getAccessToken()}` };

  try {
    const res = await instance.post(path, data, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getPostList({
  page,
  pageSize,
  orderBy,
  keyword,
}: {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string | null;
}) {
  const path = "/posts";
  const params = {
    ...(page && { page }),
    ...(pageSize && { pageSize }),
    ...(orderBy && { orderBy }),
    ...(keyword && { keyword }),
  };
  const headers = { authorization: `Bearer ${getAccessToken()}` };

  try {
    const res = await instance.get(path, { params, headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getPost(postId: string) {
  const path = `/posts/${postId}`;
  const headers = { authorization: `Bearer ${getAccessToken()}` };

  try {
    const res = await instance.get(path, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function setPost({
  postId,
  name,
  content,
}: {
  postId: string;
  name: string;
  content: string;
}) {
  const path = `/posts/${postId}`;
  const data = { name, content };
  const headers = { authorization: `Bearer ${getAccessToken()}` };

  try {
    const res = await instance.patch(path, data, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deletePost(postId: string) {
  const path = `/posts/${postId}`;
  const headers = { authorization: `Bearer ${getAccessToken()}` };

  try {
    const res = await instance.delete(path, { headers });
    return res.status;
  } catch (err) {
    console.error(err);
  }
}
