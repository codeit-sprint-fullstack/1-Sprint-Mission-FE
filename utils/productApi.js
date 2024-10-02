import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./apiEndpoint";

export async function fetchProducts({ pageSize, page, keyword, orderBy }) {
  const params = new URLSearchParams({
    orderBy: orderBy,
    keyword: keyword,
    page: page,
    pageSize: pageSize,
  });
  const response = await apiClient.get(
    API_ENDPOINTS.PRODUCTS.FETCH_PRODUCTS(params)
  );

  if (!response.data) {
    throw new Error("API 응답 데이터가 비어 있습니다.");
  }

  return response.data;
}

// 제품 생성하기
export async function createProduct(data) {
  const response = await apiClient.post(API_ENDPOINTS.PRODUCTS.BASE, data);
  return response.data;
}

// 제품 삭제하기
export async function deleteProduct(id) {
  const response = await apiClient.delete(API_ENDPOINTS.PRODUCTS.DETAIL(id));
  return response.data;
}

// 특정 제품 정보 가져오기
export async function fetchProduct(id) {
  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.DETAIL(id));
  return response.data;
}

// 즐겨찾기 추가
export async function addFavorite(productId) {
  const response = await apiClient.post(
    API_ENDPOINTS.PRODUCTS.FAVORITE(productId)
  );
  return response.data;
}

// 제품 수정하기
export async function editProduct(productId, data) {
  const response = await apiClient.patch(
    API_ENDPOINTS.PRODUCTS.DETAIL(productId),
    data
  );
  return response.data;
}

// 즐겨찾기 삭제
export async function removeFavorite(productId) {
  const response = await apiClient.delete(
    API_ENDPOINTS.PRODUCTS.FAVORITE(productId)
  );
  return response.data;
}
