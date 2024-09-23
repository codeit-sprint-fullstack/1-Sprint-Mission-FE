import { instance } from "./axios";

// 임시로 userId 고정값 사용
const userId = "123e4567-e89b-12d3-a456-426614174001";

export async function createPost(title, content) {
  const path = "/article";
  const data = { title, content };
  const headers = { authorization: userId }; // 임시로 사용

  try {
    const res = await instance.post(path, data, { headers });
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export async function getPosts(page, pageSize, orderBy, keyword) {
  const headers = { authorization: userId }; // 임시로 사용
  const path = "/article";
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
    alert(err);
  }
}

export async function getPost(postId) {
  const headers = { authorization: userId }; // 임시로 사용
  const path = `/article/${postId}`;

  try {
    const res = await instance.get(path, { headers });
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export async function setPost(postId, title, content) {
  const path = `/article/${postId}`;
  const data = { title, content };
  const headers = { authorization: userId }; // 임시로 사용

  try {
    const res = await instance.patch(path, data, { headers });
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export async function deletePost(postId) {
  const path = `/article/${postId}`;
  const headers = { authorization: userId }; // 임시로 사용

  try {
    const res = await instance.delete(path, { headers });
    return res.status;
  } catch (err) {
    alert(err);
  }
}
