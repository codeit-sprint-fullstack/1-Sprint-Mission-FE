import axios from 'axios';

export async function getProducts({ page, limit, sort, search }) {
  const params = {
    page: page.toString(),
    limit: limit.toString(),
  };

  if (sort) {
    params.sort = sort;
  }
  if (search) {
    params.search = search;
  }

  try {
    const response = await axios.get('https://myproducts-api.onrender.com/products', { params });
    return response.data;
  } catch (error) {
    const errorMessage = error.message || '데이터를 불러오는데 실패했습니다.';
    throw new Error(errorMessage);
  }
}
