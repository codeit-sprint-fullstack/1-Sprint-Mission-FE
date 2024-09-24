import apiClient from "./apiClient";
import apiHandler from "./apiHandler";

const baseUrl = "https://panda-market-api.vercel.app";

export async function fetchProducts({ pageSize, page, keyword, orderBy }) {
  return apiHandler(async () => {
    const response = await apiClient.get(`${baseUrl}/products`, {
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
    const response = await apiClient.post("/products", data, {
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
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  });
}

// 특정 제품 정보 가져오기
export async function fetchProduct(id, token) {
  return apiHandler(async () => {
    const response = await apiClient.get(`/products/${id}`, {
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
    const response = await apiClient.post(`/products/${productId}/favorite`);
    return response.data;
  });
}

// 제품 수정하기
export async function editProduct(productId, data) {
  return apiHandler(async () => {
    const response = await apiClient.patch(`/products/${productId}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  });
}

// 즐겨찾기 삭제
export async function removeFavorite(productId) {
  return apiHandler(async () => {
    const response = await apiClient.delete(`/products/${productId}/favorite`);
    return response.data;
  });
}
