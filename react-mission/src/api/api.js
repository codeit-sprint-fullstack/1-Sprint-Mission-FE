import axios from "axios";

//상품 데이터 APi주소
const instance = axios.create({
  //   baseURL: "https://panda-market-api.vercel.app", //미션 6으로 인한 주석
  baseURL: "https://product-api-cezx.onrender.com", //백엔드로 만든 api 주소
  timeout: 3000,
});

async function api(params = {}) {
  const res = await instance("/products", { params });
  return res.data;
}

export default api