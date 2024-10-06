import { renderApi } from '@utils/api/axios';

export async function getProductList(query) {
  try {
    const response = await renderApi.get('/products', {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductTotalCount(query) {
  try {
    const response = await renderApi.get('/products/total', {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
