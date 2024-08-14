import axios from "https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.2/esm/axios.min.js";

const instance = axios.create({
  // baseURL: "https://panda-market-api.vercel.app",
  baseURL: process.env.REACT_APP_BASE_URL,
});

const baseUrl = "https://panda-market-api.vercel.app";

//공부차 fetch 함수도 함께 작성 사용은 암함 추후 삭제 예정
export async function getProducts({
  order = "",
  keyword = "",
  page = 1,
  pagesize = 10,
}) {
  const query = `page=${page}&pageSize=${pagesize}&orderBy=${order}&keyword=${keyword}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  if (!response.ok) {
    throw new Error("상품리스트를 불러오지 못 했습니다.");
  }
  const data = await response.json();
  return data;
}

export async function getProduct(id) {
  const response = await fetch(`${baseUrl}/products/${id}`);
  if (!response.ok) {
    throw new Error("상품을 불러오지 못 했습니다.");
  }
  const data = await response.json();
  return data;
}

export async function updateProduct(id, item) {
  const response = await fetch(`${baseUrl}/products/${id}`, {
    method: "PATCH",
    body: item,
  });
  if (!response.ok) {
    throw new Error("상품 수정에 실패했습니다.");
  }
  const data = await response.json();
  return data;
}

export async function createProduct(item) {
  const response = await fetch(`${baseUrl}/products/`, {
    method: "POST",
    body: item,
  });
  if (!response.ok) {
    throw new Error("상품 등록에 실패했습니다.");
  }
  const data = await response.json();
  return data;
}

export async function createFavoriteProduct(id, item) {
  const response = await fetch(`${baseUrl}/products/${id}/favorite`, {
    method: "POST",
    body: item,
  });
  if (!response.ok) {
    throw new Error("상품 등록에 실패했습니다.");
  }
  const data = await response.json();
  return data;
}

//Axios code

export async function getProductsAxios(params = {}) {
  const res = await instance.get("/products", { params });
  return res.data;
}

export async function getProductAxios(id) {
  const res = await instance.get(`/products/${id}`);
  return res.data;
}

export async function updateProductAxios(id, item) {
  const res = await instance.patch(`/products/${id}`, item);
  return res.data;
}

export async function createProductAxios(item) {
  const res = await instance.post(`/products`, item);
  return res.data;
}

export async function deleteProductAxios(id) {
  const res = await instance.delete(`/products/${id}`);
  return res.status;
}
