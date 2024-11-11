import axios from "axios";

// 임시로 userId 고정값 사용
const userId = "123e4567-e89b-12d3-a456-426614174001";

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const instance = axios.create(axiosConfig);

export async function createPost({
  name,
  content,
}: {
  name: string;
  content: string;
}) {
  const path = "/posts";
  const data = { name, content };
  const headers = { authorization: userId }; // 임시로 사용

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
  keyword?: string;
}) {
  const headers = { authorization: userId }; // 임시로 사용
  const path = "/posts";
  const params = {
    ...(page && { page }),
    ...(pageSize && { pageSize }),
    ...(orderBy && { orderBy }),
    ...(keyword && { keyword }),
  };

  try {
    const res = await instance.get(path, { params, headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getPost(postId: string) {
  const headers = { authorization: userId }; // 임시로 사용
  const path = `/posts/${postId}`;

  try {
    const res = await instance.get(path, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function modifyPost({
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
  const headers = { authorization: userId }; // 임시로 사용

  try {
    const res = await instance.patch(path, data, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deletePost(postId: string) {
  const path = `/posts/${postId}`;
  const headers = { authorization: userId }; // 임시로 사용

  try {
    const res = await instance.delete(path, { headers });
    return res.status;
  } catch (err) {
    console.error(err);
  }
}

export async function createPostComment({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) {
  const path = `/posts/${postId}/comment`;
  const data = { content };
  const headers = { authorization: userId };

  try {
    const res = await instance.post(path, data, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getPostComment(postId: string) {
  const path = `/posts/${postId}/comment`;

  try {
    const res = await instance.get(path);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
