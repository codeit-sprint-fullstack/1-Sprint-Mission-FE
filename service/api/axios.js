import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-type": "application/json" },
});

export default instance;
