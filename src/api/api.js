import axios from 'axios';

const BASE_URL = 'https://panda-market-api.vercel.app/products';

export async function getProductList({
  order = 'createdAt',
  cursor = null,
  limit = 3,
} = {}) {
try {
  const query = new URLSearchParams({
    order,
    limit,
    cursor: cursor || ''
  }).toString();
  const response = await axios.get(`${BASE_URL}?${query}`);
  const body = response.data;
  console.log('API 응답 데이터:', body);
  return body;
} catch (error) {
  throw new Error('상품을 불러오는데 실패했습니다');
}
}

/* 새상품 틍록 */
export async function createProduct(product) {
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price);
  formData.append('tags', product.tags); // 태그를 문자열로 변환하여 전송

  try {
    const response = await axios.post(`${BASE_URL}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('상품 생성 실패', error);
    throw error;
  }
}

/* 제품 목록을 필터링하는 함수 */
export function filterProductsByName(products, query) {
  return products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
}