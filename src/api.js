import axios from 'axios';
/** */
async function fetchQuery(params) {
  const response = await axios.get(`http://localhost:5000/datas`, { params });
  return response;
}

async function fetchURL(params) {
  const response = await axios.get(`http://localhost:5000/datas${params}`);
  return response;
}
/**상품 페이지 */
export async function getItems({ page, pageSize, option }) {
  const params = { page, pageSize, option };
  const response = await fetchQuery(params);
  return response.data;
}

/**전체 데이터 길이 */
export async function getProductLength() {
  const response = await fetchURL('/all');
  console.log(response.data.length);
  return response.data;
}

/**상품 등록 */
export async function registrationItem(item) {
  const response = await axios.post('http://localhost:5000/datas', item);
  return response;
}
