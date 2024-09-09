import instance from "./axios.js";
export async function getArticles(params = {}) {
  const res = await instance.get("/articles", { params });
  return res.data;
}

export async function getBestArticles(
  params = {
    orderBy: "favorite",
    limit: 3,
  }
) {
  const res = await instance.get("/articles", { params });
  return res.data;
}

export async function getArticle(id) {
  const res = await instance.get(`/articles/${id}`);
  return res.data;
}

export async function updateArticles(id, item) {
  const res = await instance.patch(`/articles/${id}`, item);
  return res.data;
}

export async function createArticles(item) {
  console.log(item);
  const res = await instance.post(`/articles`, item);
  return res.data;
}

export async function deleteArticles(id) {
  const res = await instance.delete(`/articles/${id}`);
  return res.status;
}
