import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// 상품 목록을 가져오는 함수
export async function getProducts(params = {}) {
  try {
    const response = await instance.get("/products", { params });
    return response.data;
  } catch (error) {
    console.error("상품 목록을 가져오는 중 오류 발생:", error);
    throw error;
  }
}

// 특정 상품을 가져오는 함수
export async function getProduct(id) {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`ID ${id}를 가진 상품을 가져오는 중 오류 발생:`, error);
    throw error;
  }
}

// 특정 상품을 업데이트하는 함수
export async function updateProduct(id, item) {
  try {
    const response = await instance.patch(`/products/${id}`, item);
    return response.data;
  } catch (error) {
    console.error(`ID ${id}를 가진 상품을 업데이트하는 중 오류 발생:`, error);
    throw error;
  }
}

// 새로운 상품을 생성하는 함수
export async function createProduct(item) {
  try {
    const response = await instance.post(`/products`, item);
    return response.data;
  } catch (error) {
    console.error("새로운 상품을 생성하는 중 오류 발생:", error);
    throw error;
  }
}

// 특정 상품을 삭제하는 함수
export async function deleteProduct(id) {
  try {
    await instance.delete(`/products/${id}`);
    return true;
  } catch (error) {
    console.error(`ID ${id}를 가진 상품을 삭제하는 중 오류 발생:`, error);
    throw error;
  }
}
