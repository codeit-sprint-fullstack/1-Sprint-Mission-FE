import axios from "axios";

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_CODEIT_BASE_URL,
  // withCredentials: true, // 수업 내용에 있어서 코드잇에서 설정해둔줄
  headers: {
    "Content-Type": "application/json",
  },
};

export const instance = axios.create(axiosConfig);
