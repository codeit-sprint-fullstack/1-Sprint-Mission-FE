import apiClient from "./apiClient";
import { Article } from "@/types/Types";

// 단일 Article 가져오기
export async function fetchArticle(id: number): Promise<Article> {
  const { data } = await apiClient.get<Article>(`/articles/${id}`);
  return data;
}

// Article 목록 가져오기
interface FetchArticlesParams {
  orderBy: string;
  keyword: string;
  page: number;
  pageSize: number;
}
interface ArticleListResponse {
  list: Article[];
  totalCount: number;
}

export async function fetchArticles({
  orderBy,
  keyword,
  page,
  pageSize,
}: FetchArticlesParams): Promise<ArticleListResponse> {
  const params = {
    orderBy,
    keyword: keyword,
    page: page,
    pageSize: pageSize,
  };

  const { data } = await apiClient.get<ArticleListResponse>(`/articles`, {
    params,
  });
  return data;
}

// Best Article 가져오기
export async function fetchBestArticles(size: number): Promise<Article[]> {
  const params = {
    orderBy: "favorite",
    pageSize: size,
  };

  const { data } = await apiClient.get<Article[]>(`/articles`, { params });
  return data;
}

// Article 업데이트
export async function updateArticle(
  id: number,
  formData: FormData
): Promise<Article> {
  const { data } = await apiClient.patch<Article>(`/articles/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

// Article 삭제
export async function deleteArticle(id: number): Promise<void> {
  await apiClient.delete<void>(`/articles/${id}`);
}

// Article 생성
export async function createArticle(formData: FormData): Promise<Article> {
  const { data } = await apiClient.post<Article>(`/articles`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

// 좋아요 추가
export async function addLike(articleId: number): Promise<void> {
  await apiClient.post<void>(`/articles/${articleId}/like`);
}

// 좋아요 삭제
export async function removeLike(articleId: number): Promise<void> {
  await apiClient.delete<void>(`/articles/${articleId}/like`);
}
