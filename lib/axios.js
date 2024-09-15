import axios from "axios";

// 임시로 userId 고정값 사용
const userId = "123e4567-e89b-12d3-a456-426614174001";

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  header: {
    "Content-Type": "application/json",
  },
};

export const instance = axios.create(axiosConfig);

export async function createArticle(title, content) {
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

export async function getArticles(page, pageSize, orderBy, keyword) {
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

export async function getArticle(articleId) {
  const headers = { authorization: userId }; // 임시로 사용
  const path = `/article/${articleId}`;

  try {
    const res = await instance.get(path, { headers });
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export async function setArticle(articleId, title, content) {
  const path = `/article/${articleId}`;
  const data = { title, content };
  const headers = { authorization: userId }; // 임시로 사용

  try {
    const res = await instance.patch(path, data, { headers });
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export async function deleteArticle(articleId) {
  const path = `/article/${articleId}`;
  const headers = { authorization: userId }; // 임시로 사용

  try {
    const res = await instance.delete(path, { headers });
    return res.status;
  } catch (err) {
    alert(err);
  }
}

export async function createArticleComment(articleId, content) {
  const path = `/article/${articleId}/comment`;
  const data = { content };
  const headers = { authorization: userId };

  try {
    const res = await instance.post(path, data, { headers });
    return res.data;
  } catch (err) {
    alert(err);
  }
}

export async function getArticleComment(articleId) {
  const path = `/article/${articleId}/comment`;

  try {
    const res = await instance.get(path);
    return res.data;
  } catch (err) {
    alert(err);
  }
}
