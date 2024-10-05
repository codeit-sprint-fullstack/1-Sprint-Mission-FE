import apiClient from "./apiClient";
import apiHandler from "./apiHandler";

// 단일 Article 가져오기
export async function fetchArticle(id) {
  const { data } = await apiClient.get(`/articles/${id}`);
  return data;
}

// Article 목록 가져오기
export async function fetchArticles({ orderBy, keyword, page, size }) {
  const params = {
    orderBy,
    search: keyword,
    page: page,
    pageSize: size,
  };

  const { data } = await apiClient.get(`/articles`, { params });
  return data;
}

// Best Article 가져오기
export async function fetchBestArticles(size) {
  const params = {
    orderBy: "recent",
    pageSize: size,
  };

  const { data } = await apiClient.get(`/articles`, { params });
  return data;
}

// Article 업데이트
export async function updateArticle(id, formData) {
  const { data } = await apiClient.patch(`/articles/${id}`, formData);
  return data;
}

// Article 삭제
export async function deleteArticle(id) {
  const { data } = await apiClient.delete(`/articles/${id}`);
  return data;
}

// Article 생성
export async function createArticle(formData) {
  const { data } = await apiClient.post(`/articles`, formData);
  return data;
}
