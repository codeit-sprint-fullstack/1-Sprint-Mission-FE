import { instanceWithToken } from "./axios-codeit-token";

// 임시로 userId 고정값 사용
const userId = "123e4567-e89b-12d3-a456-426614174001";

export async function createPost(title, content) {
  const path = "/posts";
  const data = { title, content };

  try {
    const res = await instanceWithToken.post(path, data, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getPosts(page, pageSize, orderBy, keyword) {
  const path = "/posts";
  const params = {
    ...(page && { page }),
    ...(pageSize && { pageSize }),
    ...(orderBy && { orderBy }),
    ...(keyword && { keyword }),
  };

  try {
    const res = await instanceWithToken.get(path, { params, headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getPost(postId) {
  const path = `/posts/${postId}`;

  try {
    const res = await instanceWithToken.get(path, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function setPost(postId, title, content) {
  const path = `/posts/${postId}`;
  const data = { title, content };

  try {
    const res = await instanceWithToken.patch(path, data, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deletePost(postId) {
  const path = `/posts/${postId}`;

  try {
    const res = await instanceWithToken.delete(path, { headers });
    return res.status;
  } catch (err) {
    console.error(err);
  }
}
