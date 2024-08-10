import axios from 'axios';

const instance = axios.create({
  baseURL: `https://market-api-wze3.onrender.com`,
});

export async function getProductItemList(params = {}) {
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

export async function createProductItem(updateData) {
  try {
    const { data } = await instance.post(`/products`, updateData);
    return data;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('Created product: 데이터 생성하는데 실패했습니다');
    }
  }
}
