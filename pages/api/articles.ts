import instance from "./httpClient.js";

interface Params {
  [key: string]: string | number;
}

interface Article {
  id: string;
  title: string;
  createAt: Date;
  updateAt: Date;
  user: { id: string; nickname: string };
  userId: string;
}

export async function getArticles(
  params: Params = {},
  cursor: string = ""
): Promise<Article[]> {
  const res = await instance.get<Article[]>("/articles", {
    params: { ...params, cursor },
  });
  return res.data;
}

export async function getBestArticles(
  params: Params = {
    orderBy: "like",
    pageSize: 3,
  }
): Promise<Article[]> {
  const res = await instance.get<Article[]>("/articles", {
    params,
  });
  return res.data;
}

export async function getArticle(id: string): Promise<Article> {
  const res = await instance.get<Article>(`/articles/${id}`);
  return res.data;
}

export async function updateArticle(
  id: string,
  item: Article
): Promise<Article> {
  const res = await instance.patch<Article>(`/articles/${id}`, item);
  return res.data;
}

export async function createArticle(item: Article): Promise<Article> {
  const res = await instance.post<Article>(`/articles`, item);
  return res.data;
}

export async function deleteArticle(id: string): Promise<number> {
  const res = await instance.delete(`/articles/${id}`);
  return res.status;
}

export async function likeArticle(id: string): Promise<Article> {
  const res = await instance.post(`/articles/${id}/favorite`);
  return res.data;
}

export async function unlikeArticle(id: string): Promise<Article> {
  const res = await instance.delete(`/articles/${id}/favorite`);
  return res.data;
}
