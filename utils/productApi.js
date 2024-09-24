import apiClient from "./apiClient";
import apiHandler from "./apiHandler";
import { API_ENDPOINTS } from "./apiEndpoint";

export async function fetchProducts({ pageSize, page, keyword, orderBy }) {
  return apiHandler(async () => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.BASE, {
      params: { pageSize, page, keyword, orderBy },
    });

    if (!response.data) {
      throw new Error("API 응답 데이터가 비어 있습니다.");
    }

    return response.data;
  });
}

// 제품 생성하기
export async function createProduct(data) {
  return apiHandler(async () => {
    const response = await apiClient.post(API_ENDPOINTS.PRODUCTS.BASE, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  });
}

// 제품 삭제하기
export async function deleteProduct(id) {
  return apiHandler(async () => {
    const response = await apiClient.delete(API_ENDPOINTS.PRODUCTS.DETAIL(id));
    return response.data;
  });
}

// 특정 제품 정보 가져오기
export async function fetchProduct(id, token) {
  return apiHandler(async () => {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.DETAIL(id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });
}

// 즐겨찾기 추가
export async function addFavorite(productId) {
  return apiHandler(async () => {
    const response = await apiClient.post(
      API_ENDPOINTS.PRODUCTS.FAVORITE(productId)
    );
    return response.data;
  });
}

// 제품 수정하기
export async function editProduct(productId, data, token) {
  console.log(token);
  return apiHandler(async () => {
    const response = await apiClient.patch(
      API_ENDPOINTS.PRODUCTS.DETAIL(productId),
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  });
}

// 즐겨찾기 삭제
export async function removeFavorite(productId) {
  return apiHandler(async () => {
    const response = await apiClient.delete(
      API_ENDPOINTS.PRODUCTS.FAVORITE(productId)
    );
    return response.data;
  });
}
