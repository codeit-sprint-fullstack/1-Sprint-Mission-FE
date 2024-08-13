import axios from "axios";

//상품 데이터 APi주소
const instance = axios.create({
  //   baseURL: "https://panda-market-api.vercel.app", //미션 6으로 인한 주석
  baseURL: "https://product-api-cezx.onrender.com", //백엔드로 만든 api 주소
});

async function getApi(params = {}) {
  const res = await instance.get("/products", { params });
  return res.data;
}

async function postApi(surveyData) {
  const res = await instance.post('/products', surveyData)
  return res.data 
}

export { getApi, postApi }