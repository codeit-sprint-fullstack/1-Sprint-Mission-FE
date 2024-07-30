import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app/products/',
});

export async function getProductList(options) {
  try {
    var res;
    res = await instance.get('', {params:options});
    return res.data;
  } catch (e) {
    console.log(e.name + ':' + e.message);
  }
}
