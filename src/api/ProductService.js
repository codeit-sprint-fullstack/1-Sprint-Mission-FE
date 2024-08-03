import axios from 'axios';

const instance = axios.create({
  baseURL: `https://panda-market-api.vercel.app/`,
});

export async function getProductBestList(params = {}) {
  try {
    const { data } = await instance.get(`/products`, {
      params,
    });
    return data;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('Product List: 데이터 불러오기에 실패했습니다');
    }
  }
}

export async function getProductList(params = {}) {
  try {
    const response = await instance.get(`/products`, {
      params,
    });
    return response.data;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('Product List: 데이터 불러오기에 실패했습니다');
    }
  }
}
