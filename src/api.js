import axios from 'axios';

const DATABASE_URL = 'https://one-sprint-mission-be-7ten.onrender.com';
/** */
async function getProducts(params) {
  const response = await axios.get(`${DATABASE_URL}/datas`, { params });
  return response;
}

async function getProductsURL(params) {
  const response = await axios.get(`${DATABASE_URL}/datas${params}`);
  return response;
}
/**상품 페이지 */
export async function getItems({ page, pageSize, option }) {
  const params = { page, pageSize, option };
  const response = await getProducts(params);
  return response.data;
}

/**전체 데이터 길이 */
export async function getProductLength() {
  const response = await getProductsURL('/all');
  return response.data;
}

/**상품 등록 */
export async function registrationItem(item) {
  const response = await axios.post(`${DATABASE_URL}/datas`, item);
  return response;
}
