import { instance } from "./axios-token";

export async function createPost({
  name,
  content,
}: {
  name: string;
  content: string;
}) {
  const path = "/posts";
  const data = { name, content };

  try {
    const res = await instance.post(path, data);
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

  try {
    const res = await instance.get(path, { params });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getPost(postId: string) {
  const path = `/posts/${postId}`;

  try {
    const res = await instance.get(path);
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

  try {
    const res = await instance.patch(path, data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deletePost(postId: string) {
  const path = `/posts/${postId}`;

  try {
    const res = await instance.delete(path);
    return res.status;
  } catch (err) {
    console.error(err);
  }
}
