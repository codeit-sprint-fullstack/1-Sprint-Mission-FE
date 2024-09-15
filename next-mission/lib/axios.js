import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: "https://one-sprint-mission-be-tz0t.onrender.com",
});

export default instance;
