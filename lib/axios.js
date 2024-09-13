import axios from "axios";

const instance = axios.create({
  baseURL: "https://one-sprint-mission-be-svjo.onrender.com",
});

export default instance;
