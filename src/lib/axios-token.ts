import axios from "axios";

import {
  setAccessToken,
  getAccessToken,
  getRefreshToken,
} from "./token-codeit";

const baseURL = process.env.NEXT_PUBLIC_SPRINT_BASE_URL || "";

// Axios 인스턴스 생성
export const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
