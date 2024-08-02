import axios from "axios";

export async function getProducts({page, pageSize, orderBy, keyword}) {
  const params = {
    page: page.toString(),
    pageSize: pageSize.toString(),
  };

  if (orderBy) {
    params.orderBy = orderBy;
  }
  if (keyword) {
    params.keyword = keyword;
  }

  try {
    const response = await axios.get('https://panda-market-api.vercel.app/products', { params });
    return response.data;
  } catch (error) {
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }
}