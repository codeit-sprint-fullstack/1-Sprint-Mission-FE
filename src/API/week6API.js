import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_BASE_URL,
});

export async function getProductsAxios(params = {}) {
  try {
    const res = await instance.get("/products", { params });
    return res.data;
  } catch (error) {
    console.error("상품 목록을 가져오는 중 오류 발생:", error);
    throw error;
  }
}

export async function getProductAxios(id) {
  try {
    const res = await instance.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error(`ID ${id}를 가진 상품을 가져오는 중 오류 발생:`, error);
    throw error;
  }
}

export async function updateProductAxios(id, item) {
  try {
    const res = await instance.patch(`/products/${id}`, item);
    return res.data;
  } catch (error) {
    console.error(`ID ${id}를 가진 상품을 업데이트하는 중 오류 발생:`, error);
    throw error;
  }
}

export async function createProductAxios(item) {
  try {
    const res = await instance.post(`/products`, item);
    return res.data;
  } catch (error) {
    console.error("새로운 상품을 생성하는 중 오류 발생:", error);
    throw error;
  }
}

export async function deleteProductAxios(id) {
  try {
    const res = await instance.delete(`/products/${id}`);
    return res.status;
  } catch (error) {
    console.error(`ID ${id}를 가진 상품을 삭제하는 중 오류 발생:`, error);
    throw error;
  }
}
