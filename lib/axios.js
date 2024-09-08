import axios from "axios";

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  header: {
    "Content-Type": "application/json",
  },
};

export const instance = axios.create(axiosConfig);
