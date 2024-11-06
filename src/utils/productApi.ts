import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./apiEndpoint";
import { Product } from "@/types/Types";
import { FetchProductsParams } from "@/types/Types";

// 제품 목록 가져오기
export async function fetchProducts({
  pageSize,
  page,
  keyword = "",
  orderBy = "recent",
}: FetchProductsParams): Promise<Product[]> {
  const params = new URLSearchParams({
    orderBy: orderBy,
    keyword: keyword,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  const response = await apiClient.get(
    API_ENDPOINTS.PRODUCTS.FETCH_PRODUCTS(params.toString())
  );

  if (!response.data) {
    throw new Error("API 응답 데이터가 비어 있습니다.");
  }

  return response.data;
}

// 제품 생성하기
export async function createProduct(
  formData: FormData
): Promise<{ product: Product }> {
  const response = await apiClient.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

// 제품 삭제하기
export async function deleteProduct(id: number): Promise<void> {
  await apiClient.delete(API_ENDPOINTS.PRODUCTS.DETAIL(id));
}

// 특정 제품 정보 가져오기
export async function fetchProduct(id: number): Promise<Product> {
  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.DETAIL(id));
  return response.data;
}

// 즐겨찾기 추가
export async function addFavorite(productId: number): Promise<void> {
  await apiClient.post(API_ENDPOINTS.PRODUCTS.FAVORITE(productId));
}

// 제품 수정하기
export async function editProduct(
  productId: number,
  data: FormData
): Promise<Product> {
  const response = await apiClient.patch(
    API_ENDPOINTS.PRODUCTS.DETAIL(productId),
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
}

// 즐겨찾기 삭제
export async function removeFavorite(productId: number): Promise<void> {
  await apiClient.delete(API_ENDPOINTS.PRODUCTS.FAVORITE(productId));
}
