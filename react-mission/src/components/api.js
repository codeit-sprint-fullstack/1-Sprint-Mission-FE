import axios from "axios";

//상품 데이터 APi주소
const instance = axios.create({
    baseURL: 'https://panda-market-api.vercel.app',
    timeout: 3000,
});

async function api(params = {}) {
        const res = await instance('/products', { params });
        return res.data;
 
}

export default api;