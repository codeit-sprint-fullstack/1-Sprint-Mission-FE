import axios from 'axios';

const instance = axios.create({
  baseURL: `https://sprint-mission-api.vercel.app`,
});

export async function getProductList(params = {}) {
  const { page = 1, pageSize = 10, keyword = '' } = params;
  try {
    const res = await instance.get(`/products`, {
      params,
    });
    return res.data;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('데이터 불러오기에 실패했습니다');
    }
  }
}

export async function getProduct(productId) {
  try {
    const res = await instance.get(`/products/${productId}`);
    return res.data;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('데이터 불러오기에 실패했습니다');
    }
  }
}

export async function createProduct(updateData) {
  try {
    const res = await instance.post(`/products`, updateData);
    return res.data;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('데이터 불러오기에 실패했습니다');
    }
  }
}

export async function patchProduct(productId, updateData) {
  try {
    const res = await instance.patch(`/products/${productId}`, updateData);
    return res.data;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('데이터 불러오기에 실패했습니다');
    }
  }
}

export async function deleteProduct(id) {
  try {
    const res = await instance.delete(`/products/${id}`);
    return true;
  } catch (e) {
    if (e.res) {
      console.log(e.res.status);
      console.log(e.res.data);
    } else {
      console.log('데이터 불러오기에 실패했습니다');
    }
  }
}
