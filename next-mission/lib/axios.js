import axios from "axios";

const instance = axios.create({
  baseURL: "https://one-sprint-mission-be-tz0t.onrender.com",
});

export default instance;
