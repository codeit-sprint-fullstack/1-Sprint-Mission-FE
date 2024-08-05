import axios from "axios";

//상품 데이터 APi주소
const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  timeout: 3000,
});

async function api(params = {}) {
  const res = await instance("/products", { params });
  return res.data;
}

// 미션 6에서 만든 api
const mission6Instance = axios.create({
  baseURL: "https://product-api-cezx.onrender.com",
});

async function Mission6Api(params = {}) {
  const res = await mission6Instance("/products", { params });
  return res.data;
}

export { api, Mission6Api };
