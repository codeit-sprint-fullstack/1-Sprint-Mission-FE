import axios from "axios";

const API_URL = process.env.NEXT_LOCAL_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-type": "application/json" },
});
