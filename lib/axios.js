import axios from "axios";

const instance = axios.create({
  baseURL: "https://product-api-shiu.onrender.com",
});

export default instance;
