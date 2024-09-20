import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/", // 모든 요청의 기본 URL 설정
});

export default instance;
