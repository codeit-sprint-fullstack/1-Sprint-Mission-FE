import axios from "axios";

const api = axios.create({
  baseURL: "https://ms10-5yps.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getArticles(data) {
  try {
    const response = await api.get("/articles", {
      params: data,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getArticleId(articleId, data) {
  try {
    const response = await api.get(`/articles/${articleId}`, data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function patchArticle(articleId, data) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.patch(`/articles/${articleId}`, data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function deleteArticle(articleId) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.delete(`/articles/${articleId}`);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function postArticle(data) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.post("/articles", data);
    return response;
  } catch (error) {
    return error.response;
  }
}
