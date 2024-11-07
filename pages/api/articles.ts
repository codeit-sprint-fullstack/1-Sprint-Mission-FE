import { User } from "@/utils/interface/User";
import instance from "./httpClient";
import { Entity } from "@/utils/interface/defaultEntity";

interface Params {
  [key: string]: string | number;
}

interface Article extends Entity {
  owner: User;
  ownerId: string;
  title: string;
  content: string;
  likeCount?: number;
  image: string;
  favoriteCount: number;
  isFavorite: boolean;
}

interface ArticleItem {
  title: string;
  content: string;
}

interface ResponseData {
  list: Article[];
  nextCursor: string;
}

export async function getArticles(
  params: Params = {},
  cursor: string = ""
): Promise<ResponseData> {
  const res = await instance.get<ResponseData>("/articles", {
    params: { ...params, cursor },
  });
  return res.data;
}

export async function getBestArticles(
  params: Params = {
    orderBy: "like",
    limit: 3,
  }
): Promise<ResponseData> {
  const res = await instance.get<ResponseData>("/articles", {
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
  item: ArticleItem
): Promise<Article> {
  const res = await instance.patch<Article>(`/articles/${id}`, item);
  return res.data;
}

export async function createArticle(item: ArticleItem): Promise<Article> {
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
