import instance from "./axios";

// 특정 상품 조회
export const getProductById = async (productId) => {
  const res = await instance.get(`/products/${productId}`);
  return res.data;
};

